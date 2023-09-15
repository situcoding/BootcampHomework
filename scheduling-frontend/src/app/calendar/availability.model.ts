/* availability.model.ts */

export enum WeekDay {
    Mon = 'Mon',
    Tue = 'Tue',
    Wed = 'Wed',
    Thu = 'Thu',
    Fri = 'Fri'
  }
  
  export interface Availability {
    start_time: string | number | Date;
    end_time: string | number | Date;
    id: number;
    date: Date; /* If this is a date without a time, it's okay to use Date here */
    day: WeekDay; /* Using the enum type */
    startTime: string; /* If you only care about the time, string may suffice */
    endTime: string; /* If you only care about the time, string may suffice */
    timeZone: string; /* camelCasing this to match other fields */
  }
  