import dayjs from 'dayjs';
import { get, getDatabase, push, ref, set } from 'firebase/database';
import { defineStore } from 'pinia';
import type { StudentClass, StudentClassFirebase, Task } from 'src/models';

export const useClassesStore = defineStore('classes', {
  state: () => ({
    classesAvailable: [] as StudentClass[],
    selectedDate: dayjs().format('YYYYMMDD'),
    tasks: [] as Task[],
  }),
  getters: {
    todaysClasses(state): StudentClass[] & { tasks: Task[] }[] {
      return state.classesAvailable
        .filter((studentClass) =>
          studentClass.days.includes(dayjs(this.selectedDate).day())
        )
        .map((studentClass) => ({
          ...studentClass,
          tasks: this.tasks.filter((task) => task.classId === studentClass.id),
        }));
    },
    selectedDateFormatted(state) {
      return dayjs(state.selectedDate).format('M/D/YYYY');
    },
  },
  actions: {
    async addTask(newTask: {
      classId: string;
      name: string;
      type: 'simple' | 'link' | 'video';
      url?: string;
    }) {
      const db = getDatabase();
      const taskRef = ref(db, `tasks/${this.selectedDate}`);
      await push(taskRef, {
        ...newTask,
        complete: false,
      });
      this.getTasks();
    },
    async completeTask(taskId: string, isComplete: boolean) {
      const db = getDatabase();
      console.log(`tasks/${this.selectedDate}/${taskId}/complete`);
      const taskCompleteRef = ref(
        db,
        `tasks/${this.selectedDate}/${taskId}/complete`
      );
      await set(taskCompleteRef, isComplete);
      this.getTasks();
    },
    async getTasks() {
      const db = getDatabase();
      const taskRef = ref(db, `/tasks/${this.selectedDate}`);
      const snapshot = await get(taskRef);
      const data = snapshot.val();
      this.setTasks(
        data
          ? Object.entries(data).map(([id, task]) => {
              return {
                ...(<Task>task),
                id,
              };
            })
          : []
      );
    },
    setClasses(studentClasses: StudentClassFirebase[]) {
      this.classesAvailable = studentClasses.map((studentClass) => {
        return {
          ...studentClass,
          days: (studentClass.days || '')
            .split(',')
            .map((stringValue) => parseInt(stringValue)),
        };
      });
    },
    setTasks(tasks: Task[]) {
      this.tasks = tasks;
    },
  },
});
