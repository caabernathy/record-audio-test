import { useEffect, useState, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import cx from 'classnames';

import Text from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Mic from '@material-ui/icons/Mic';
import Pause from '@material-ui/icons/Pause';
import Stop from '@material-ui/icons/Stop';

import useStyles from './styles';
import { convertSecondsToHoursMinutesSeconds } from './utils/helpers';

export default function App() {
  const classes = useStyles();
  const [duration, setDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPausedRecording, setIsPausedRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const canvasRef: any = useRef(null);
  const waveformRef: any = useRef(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const playerRef = useRef<HTMLAudioElement>(null);
  const blobs = useRef<Blob[]>([]);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: '#waveform', // waveformRef.current,
      scrollParent: true,
      waveColor: '#CC0000',
      progressColor: '#666666',
    });
    wavesurfer.current.on('ready', function () {
      if (wavesurfer.current) {
        setShowControls(true);
      }
    });
    wavesurfer.current.on('finish', function () {
      if (wavesurfer.current && wavesurfer.current.isPlaying) {
        // wavesurfer.current.seekTo(0);
        setIsPlaying(false);
      }
    });
    // wavesurfer.current.load(
    //   'https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
    // );

    return () => {
      if (wavesurfer.current) wavesurfer.current.destroy();
    };
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isRecording && !isPausedRecording) {
      interval = setInterval(() => {
        setDuration((duration) => duration + 1);
      }, 1000);
    } else if (!isRecording && duration !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPausedRecording, duration]);

  const visualize = () => {
    if (!stream.current) return;

    const audioCtx = new AudioContext();
    const canvas = canvasRef.current;
    const canvasCtx = canvasRef.current.getContext('2d');

    const source = audioCtx.createMediaStreamSource(stream.current);

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);

    const draw = () => {
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;

      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(255, 255, 255)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(255, 0, 0)';

      canvasCtx.beginPath();

      let sliceWidth = (WIDTH * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i = i + 4) {
        let v = dataArray[i] / 128.0;
        let y = (v * HEIGHT) / 2;
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();
  };

  const showRecordedAudio = () => {
    if (!blobs.current.length) return;
    const mimeType = mediaRecorder.current
      ? mediaRecorder.current.mimeType
      : '';
    const blob = new Blob(blobs.current, {
      type: mimeType,
    });

    // Show recorded audio
    if (wavesurfer.current) {
      wavesurfer.current.loadBlob(blob);
    }
    if (playerRef.current) {
      const url = URL.createObjectURL(blob);
      playerRef.current.src = url;
    }
  };

  const startRecording = async () => {
    setIsRecording(true);
    setIsPausedRecording(false);
    setShowControls(false);
    setIsPlaying(false);
    setDuration(0);
    blobs.current.length = 0;
    if (wavesurfer.current) {
      wavesurfer.current.empty();
    }
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    stream.current = audioStream;
    mediaRecorder.current = new MediaRecorder(audioStream);
    mediaRecorder.current.ondataavailable = (event: any) => {
      // Let's append blobs for now, we could also upload them to the network.
      if (event.data) blobs.current.push(event.data);
    };
    mediaRecorder.current.onstop = showRecordedAudio;
    // Let's receive 1 second blobs
    mediaRecorder.current.start(1000);

    // Start the visualizer
    visualize();
  };

  const playRecording = () => {
    if (playerRef.current && wavesurfer.current) {
      wavesurfer.current.playPause();
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
      wavesurfer.current.setMute(true);
      setIsPlaying((isPlaying) => !isPlaying);
    }
  };

  const pauseRecording = () => {
    if (!isRecording) return;
    if (mediaRecorder.current) {
      if (isPausedRecording) {
        mediaRecorder.current.resume();
      } else {
        mediaRecorder.current.pause();
      }
    }
    setIsPausedRecording((isPausedRecording) => !isPausedRecording);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPausedRecording(false);
    // Let's stop capture and recording
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      if (stream.current) {
        stream.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.titleContainer}>
          <Mic className={classes.micIcon} />
          <Text className={classes.titleText}>
            Record Message for Sally Smith
          </Text>
        </Box>
        <Text className={classes.ctaText}>TRY RECORDING ONE NOW!</Text>
        <Box className={classes.audioContainer}>
          <canvas
            className={cx(classes.audioPreview, {
              [classes.visible]: isRecording,
              [classes.hidden]: !isRecording,
            })}
            ref={canvasRef}
          ></canvas>
          <div
            className={cx(classes.waveform, {
              [classes.visible]: !isRecording,
              [classes.hidden]: isRecording,
            })}
            id="waveform"
            ref={waveformRef}
          ></div>
        </Box>
        <audio className={classes.player} ref={playerRef} controls></audio>
        <Text className={classes.duration}>
          {convertSecondsToHoursMinutesSeconds(duration)}
        </Text>
        {isRecording ? (
          <Box className={classes.pauseStopContainer}>
            <IconButton className={classes.stopButton} onClick={stopRecording}>
              <Stop className={classes.recordIcon} />
            </IconButton>
            <IconButton
              className={classes.pauseButton}
              onClick={pauseRecording}
            >
              <Pause className={classes.pauseIcon} />
            </IconButton>
          </Box>
        ) : (
          <IconButton className={classes.recordButton} onClick={startRecording}>
            <Mic className={classes.recordIcon} />
          </IconButton>
        )}
        {showControls && (
          <Box className={classes.actions}>
            <Button
              variant="contained"
              className={classes.listenButton}
              onClick={playRecording}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button variant="contained" color="primary">
              Send
            </Button>
            <Button variant="contained" className={classes.deleteButton}>
              Delete
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
