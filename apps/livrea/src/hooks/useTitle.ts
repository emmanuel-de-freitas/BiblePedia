import { parsePath } from 'react-router';
import { useLocation } from 'react-router';

export const useTitle = () => {
  const location = useLocation();
  if (!location.pathname) return 'Home';
  const segments = location.pathname?.replace('/', '').split('/');

  return segments && segments.length > 0 ? segments[1] : 'Home';
};

export default useTitle;
