import { getDatabase, ref, onValue } from 'firebase/database';
import { boot } from 'quasar/wrappers';
import { useClassesStore } from 'src/stores/classes';

export default boot(() => {
  const db = getDatabase();
  const classesStore = useClassesStore();

  const classesRef = ref(db, '/classes');
  onValue(classesRef, (snapshot) => {
    const data = snapshot.val();
    classesStore.setClasses(Object.values(data));
  });

  const tasksRef = ref(db, '/tasks/20230509');
  onValue(tasksRef, (snapshot) => {
    const data = snapshot.val();
    classesStore.setTasks('20230509', Object.values(data));
  });
});
