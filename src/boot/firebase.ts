import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { boot } from 'quasar/wrappers';

export default boot(() => {
  const app = initializeApp(process.env.FIREBASE_CONFIG);
  getAnalytics(app);
});
