import { addMinutes } from 'date-fns';

import { TIME_ZONE_OFFSET } from '@config/constants/constants.constants';

export const addTimeZone = (time: Date) => {
  return addMinutes(time, TIME_ZONE_OFFSET);
};
