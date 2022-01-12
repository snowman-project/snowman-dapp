import { useParams } from 'react-router';

export function useRouterParam(name: string) {
  const params = useParams();
  return params[name];
}
