import { Dayjs } from 'dayjs';

export interface StudentFirebase {
  name: string;
  classes: string;
}

export interface Student {
  id: string;
  name: string;
  classIds: string[];
}

export interface StudentClassFirebase {
  commonTasks: TaskDescription[];
  days: string;
  description: string;
  id: string;
  name: string;
}

export interface StudentClass {
  commonTasks: TaskDescription[];
  days: number[];
  description: string;
  id: string;
  name: string;
}

export interface TaskDescription {
  name: string;
  type: 'video' | 'link' | 'simple';
  url?: string;
}

export interface Task extends TaskDescription {
  classId: string;
  complete: boolean;
  date: Dayjs;
  id: string;
}

export interface TaskWithIndex extends Task {
  index: number;
}
