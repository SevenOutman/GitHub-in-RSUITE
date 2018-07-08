export default {
  path: 'orgs/:login',
  indexRoute: {
    onEnter({ params: { login } }, replace) {
      replace(`/${login}`);
    }
  }
};