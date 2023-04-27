import { addMinutes } from 'date-fns';

export const addTimeZone = (time: Date) => {
  const timeOffset = time.getTimezoneOffset();
  return addMinutes(time, timeOffset);
};
