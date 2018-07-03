import { DOMHelper } from 'rsuite';
import Root from './index';

const { removeClass } = DOMHelper;

const routes = {
  component: Root,
  childRoutes: [
    {
      path: '*',
      title: '页面不存在',
    }
  ]
};

export default routes;
