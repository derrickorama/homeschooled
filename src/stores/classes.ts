import dayjs from 'dayjs';
import { get, getDatabase, push, ref, set } from 'firebase/database';
import { defineStore } from 'pinia';
import type { StudentClass, StudentClassFirebase, Task } from 'src/models';
import { useStudentsStore } from './students';

export const useClassesStore = defineStore('classes', {
  state: () => ({
    classesAvailable: [] as StudentClass[],
    selectedDate: dayjs().format('YYYYMMDD'),
    tasks: [] as Task[],
  }),
  getters: {
    classesById(state) {
      const classesById = {} as { [id: string]: StudentClass };
      state.classesAvailable.forEach((studentClass) => {
        classesById[studentClass.id] = studentClass;
      });
      return classesById;
    },
    todaysClasses(): StudentClass[] & { tasks: Task[] }[] {
      return this.currentStudentClasses
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
    currentStudentClasses(state) {
      const { currentStudent } = useStudentsStore();
      return state.classesAvailable.filter(({ id }) =>
        currentStudent?.classIds.includes(id)
      );
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
          ? Object.entries(data).map(([id, task]) => ({
              ...(<Task>task),
              id,
            }))
          : []
      );
    },
    setClasses(studentClasses: StudentClassFirebase[]) {
      this.classesAvailable = studentClasses.map((studentClass) => ({
        ...studentClass,
        commonTasks: studentClass.commonTasks
          ? Object.values(studentClass.commonTasks)
          : [],
        days: (studentClass.days || '')
          .split(',')
          .map((stringValue) => parseInt(stringValue)),
      }));
    },
    setDate(date: string) {
      this.selectedDate = date;
    },
    setTasks(tasks: Task[]) {
      this.tasks = tasks;
    },
  },
});
