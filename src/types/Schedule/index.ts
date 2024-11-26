export type ISchedule = {
  id?: string;
  startDate: string;
  endDate: string;
  [x: string]: string | number | boolean | undefined; // Allow specific types for dynamic properties
};

export type IScheduleForm = {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
};
