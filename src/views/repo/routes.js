import Repo from './index';
import Stargazers from './stargazers';
import Tree from '@/views/repo/tree';
import Blob from '@/views/repo/blob';
import RepoIssues from '@/views/repo/issues';
import RepoPrs from '@/views/repo/pulls';
import Commits from '@/views/repo/commits';

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
      path: 'commits/:ref',
      component: Commits
    },
    {
      path: 'stargazers',
      component: Stargazers
    },
    {
      path: 'issues',
      indexRoute: {
        component: RepoIssues
      },
      childRoutes: [

      ]
    },
    {
      path: 'pulls',
      indexRoute: {
        component: RepoPrs
      },
      childRoutes: [

      ]
    }
  ]
};