import { subMinutes } from 'date-fns';

import { TIME_ZONE_OFFSET } from '@config/constants/constants.constants';

export const removeTimeZone = (time: Date) => {
  return subMinutes(time, TIME_ZONE_OFFSET);
};
