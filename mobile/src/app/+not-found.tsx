import { Redirect } from 'expo-router';

// The app is one screen; any other address (an old link, a refresh on a hosted
// path) opens it instead of showing "Unmatched route".
export default function NotFound() {
  return <Redirect href="/" />;
}
