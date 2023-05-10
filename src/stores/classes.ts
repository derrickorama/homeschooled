import dayjs from 'dayjs';
import { getDatabase, ref, set } from 'firebase/database';
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
    completeTask(taskId: string, isComplete: boolean) {
      const db = getDatabase();
      const taskCompleteRef = ref(
        db,
        `tasks/${this.selectedDate}/${taskId}/complete`
      );
      set(taskCompleteRef, isComplete);
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
