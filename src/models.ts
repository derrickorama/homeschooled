export interface StudentClass {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}

export interface Task {
  complete: boolean;
  title: string;
  type: 'video' | 'link' | 'simple';
  url?: string;
}

export interface TaskWithIndex extends Task {
  index: number;
}
