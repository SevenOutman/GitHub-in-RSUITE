import React from 'react';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router } from 'react-router';
import { browserHistory } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import routes from '@/views/routes';
import store from '@/redux';
import '@/less/index.less';


const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing')
      .toJS();
  }
});

function App({ apolloClient }) {

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
