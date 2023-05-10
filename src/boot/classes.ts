import { get, getDatabase, onValue, ref } from 'firebase/database';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { boot } from 'quasar/wrappers';
import { useClassesStore } from 'src/stores/classes';

export default boot(async () => {
  const db = getDatabase();
  const classesStore = useClassesStore();
  const { selectedDate } = storeToRefs(classesStore);

  const classesRef = ref(db, '/classes');
  onValue(classesRef, (snapshot) => {
    const data = snapshot.val();
    classesStore.setClasses(Object.values(data));
  });

  async function updateTasks() {
    const taskRef = ref(db, `/tasks/${selectedDate.value}`);
    const snapshot = await get(taskRef);
    const data = snapshot.val();
    classesStore.setTasks(data ? Object.values(data) : []);
  }

  updateTasks();

  watch(selectedDate, updateTasks);
});
