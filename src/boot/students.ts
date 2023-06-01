import { getDatabase, onValue, push, ref } from 'firebase/database';
import { boot } from 'quasar/wrappers';
import { useStudentsStore } from 'src/stores/students';

export default boot(async () => {
  const db = getDatabase();
  const studentsStore = useStudentsStore();

  const classesRef = ref(db, '/students');
  onValue(classesRef, (snapshot) => {
    const data = snapshot.val();
    studentsStore.setStudents(Object.values(data));
  });

  // watch(selectedDate, () => classesStore.getTasks());
});
