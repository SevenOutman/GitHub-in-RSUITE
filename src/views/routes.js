import Root from './index';

import Layout from '@/components/Layout';
import user from '@/views/user/routes';

const routes = {
  component: Root,
  childRoutes: [
    {
      path: '/',
      component: Layout,
      childRoutes: [
        user
      ]
    },
    {
      path: '*',
      title: '页面不存在',
    }
  ]
};

export default routes;
