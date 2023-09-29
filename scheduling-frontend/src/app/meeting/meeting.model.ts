  /* meeting.model.ts */

  export enum MeetingType {
    Internal = 'I',
    External = 'E'
  }
  
  export interface Meeting {
    id: number;
    date: string | Date;
    start_time: string;
    end_time: string;
    time_zone: string;
    location: string;
    attendees?: string[];
    host?: string;
    co_host?: string;
    subject?: string;
    meeting_type: MeetingType;
    notes?: string;
    createdAt: string | Date;
    updatedAt?: string | Date;
  }
  
  export interface UpcomingMeeting extends Meeting {
    status: string;
    remainingTime: string;
    id: number;
    date: string | Date;
    start_time: string;
    end_time: string;
    time_zone: string;
    location: string;
    subject?: string;
    meeting_type: MeetingType;
   
  }
  