import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(
  ({ breakpoints, pink, error, greyLight, greenGrey, darkGreen }: any) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 30,
      maxWidth: 1720,
    },
    '@keyframes pulse': {
      from: { opacity: 0.2 },
      to: { opacity: 1 },
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: 50,
    },
    titleText: {
      paddingLeft: 10,
    },
    ctaText: {
      textTransform: 'uppercase',
      paddingBottom: 100,
    },
    duration: {
      paddingBottom: 20,
    },
    recordButton: {
      background: error,
      borderRadius: '50%',
      width: '80px',
      height: '80px',
      '&&:hover': {
        background: pink,
      },
    },
    pauseButton: {
      background: error,
      borderRadius: '50%',
      width: '80px',
      height: '80px',
      '&&:hover': {
        background: pink,
      },
    },
    stopButton: {
      background: darkGreen,
      borderRadius: '50%',
      width: '80px',
      height: '80px',
      '&&:hover': {
        background: greenGrey,
      },
    },
    pauseStopContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      gap: 30,
    },
    micIcon: {
      fontSize: 20,
      color: 'black',
    },
    recordIcon: {
      fontSize: 40,
      color: 'white',
    },
    pauseIcon: {
      fontSize: 40,
      color: 'white',
      animationName: '$pulse',
      animationDuration: '1.5s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
      gap: 15,
    },
    listenButton: {
      background: pink,
      color: 'white',
    },
    deleteButton: {
      background: greyLight,
      color: 'white',
    },
    audioContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '70%',
      [breakpoints.down('md')]: {
        width: '90%',
      },
    },
    audioPreview: {},
    waveform: {
      width: '100%',
    },
    visible: {
      display: 'block',
    },
    hidden: {
      display: 'none',
    },
  }),
  { name: 'Record' },
);
