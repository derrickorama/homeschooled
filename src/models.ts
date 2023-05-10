import { Dayjs } from 'dayjs';

export interface StudentClassFirebase {
  id: string;
  name: string;
  days: string;
  description: string;
}

export interface StudentClass {
  id: string;
  name: string;
  days: number[];
  description: string;
}

export interface Task {
  classId: string;
  complete: boolean;
  date: Dayjs;
  id: string;
  name: string;
  type: 'video' | 'link' | 'simple';
  url?: string;
}

export interface TaskWithIndex extends Task {
  index: number;
}
