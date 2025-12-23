import { parsePath } from 'react-router';
import { useLocation } from 'react-router';

export const usePathname = () => {
  const location = useLocation();
  const { pathname } = parsePath(location.pathname);
  const title = pathname?.replace('/', '');
  return title ?? 'Home';
};

export default usePathname;
