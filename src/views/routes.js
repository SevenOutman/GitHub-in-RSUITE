import Root from './index';

import Layout from '@/components/Layout';
import user from '@/views/user/routes';
import repo from '@/views/repo/routes';

const routes = {
  component: Root,
  childRoutes: [
    {
      path: '/',
      component: Layout,
      childRoutes: [
        user,
        repo
      ]
    },
    {
      path: '*',
      title: '页面不存在',
    }
  ]
};

export default routes;
