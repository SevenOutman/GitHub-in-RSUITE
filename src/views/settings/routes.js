import Profile from '@/views/settings/profile';

export default {
  path: 'settings',
  indexRoute: {
    onEnter(_, replace) {
      replace('/settings/profile');
    }
  },
  childRoutes: [
    {
      path: 'profile',
      component: Profile
    }
  ]
};
