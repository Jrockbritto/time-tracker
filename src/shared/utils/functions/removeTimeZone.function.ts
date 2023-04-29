import { subMinutes } from 'date-fns';

export const removeTimeZone = (time: Date) => {
  const timeOffset = time.getTimezoneOffset();
  return subMinutes(time, timeOffset);
};
