/**
 * Convert seconds to time format - HOUR:MIN:SEC
 * @example
 * convertSecondsToHoursMinutesSeconds(45); // 00:00:45
 * convertSecondsToHoursMinutesSeconds(203); // 00:03:23
 * @param sec - seconds
 */
export const convertSecondsToHoursMinutesSeconds = (
  duration: number,
): string => {
  var date = new Date(0);
  date.setSeconds(duration);
  return date.toISOString().substr(11, 8);
};
