import { defineStore } from 'pinia';
import type { Student, StudentClass, StudentFirebase } from 'src/models';
import { useClassesStore } from './classes';

export const useStudentsStore = defineStore('students', {
  state: () => ({
    currentStudentIndex: 1,
    isLoadingStudents: false,
    studentsAvailable: [] as Student[],
  }),
  getters: {
    currentStudent(state): Student {
      return this.students[state.currentStudentIndex];
    },
    students(): Array<Student & { classes: StudentClass[] }> {
      const classesStore = useClassesStore();
      return this.studentsAvailable.map((student) => ({
        ...student,
        classes: student.classIds
          .map((classId) => classesStore.classesById[classId])
          .filter((studentClass) => studentClass),
      }));
    },
  },
  actions: {
    async setStudents(students: StudentFirebase[]) {
      this.isLoadingStudents = true;
      this.studentsAvailable = Object.entries(students).map(
        ([id, studentData]) => ({
          ...studentData,
          id,
          classIds: studentData.classes.split(','),
        })
      );
    },
  },
});
