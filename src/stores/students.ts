import { defineStore } from 'pinia';
import type { Student, StudentClass, StudentFirebase } from 'src/models';
import { useClassesStore } from './classes';

type StudentObject = {
  [studentId: string]: Student & { classes: StudentClass[] };
};

export const useStudentsStore = defineStore('students', {
  state: () => {
    const currentStudentId =
      localStorage.getItem('students/currentStudentId') || '';

    return {
      currentStudentId,
      isLoadingStudents: false,
      studentsAvailable: [] as Student[],
    };
  },
  getters: {
    currentStudent(state): Student | undefined {
      return this.students[state.currentStudentId];
    },
    students(): StudentObject {
      const students = {} as StudentObject;
      const classesStore = useClassesStore();

      this.studentsAvailable.forEach((student) => {
        students[student.id] = {
          ...student,
          classes: student.classIds
            .map((classId) => classesStore.classesById[classId])
            .filter((studentClass) => studentClass),
        };
      });

      return students;
    },
  },
  actions: {
    async setStudents(students: StudentFirebase[]) {
      this.studentsAvailable = Object.entries(students).map(
        ([id, studentData]) => ({
          ...studentData,
          id,
          classIds: studentData.classes.split(','),
        })
      );

      if (!this.currentStudent) {
        this.selectStudent(this.studentsAvailable[0].id);
      }
    },
    selectStudent(studentId: string) {
      this.currentStudentId = studentId;
      localStorage.setItem('students/currentStudentId', studentId);
    },
  },
});
