import Repo from './index';
import Stargazers from './stargazers';

export default {
  path: ':owner/:name',
  indexRoute: {
    component: Repo
  },
  childRoutes: [
    {
      path: 'stargazers',
      component: Stargazers
    }
  ]
};