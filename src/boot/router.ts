import dayjs from 'dayjs';
import { boot } from 'quasar/wrappers';
import { useClassesStore } from 'src/stores/classes';

export default boot(({ router }) => {
  router.beforeEach((to, _, next) => {
    if (to.name === 'main') {
      const todaysDate = dayjs().format('YYYYMMDD');

      const selectedDate = to.query.date || todaysDate;

      if (selectedDate === todaysDate && to.query.date) {
        router.replace({ query: {} });
        return;
      }

      const classesStore = useClassesStore();
      classesStore.setDate(<string>selectedDate);
    }

    next();
  });
});
