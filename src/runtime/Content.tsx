import { ReactElement } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes as islandRoutes } from 'island:routes';

type RawRoute = {
  path: string;
  element: ReactElement;
  name?: string;
};

const routes: Array<RawRoute> = islandRoutes;

export const Content = () => {
  const rootElement = useRoutes(routes);
  return rootElement;
};
