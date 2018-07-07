import Repo from './index';
import Stargazers from './stargazers';
import Tree from '@/views/repo/tree';
import Blob from '@/views/repo/blob';

export default {
  path: ':owner/:name',
  indexRoute: {
    component: Repo
  },
  childRoutes: [
    {
      path: 'tree/:ref/:path',
      component: Tree
    },
    {
      path: 'blob/:ref/:path',
      component: Blob,
    },
    {
      path: 'stargazers',
      component: Stargazers
    }
  ]
};