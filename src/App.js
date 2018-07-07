import React from 'react';
import { Provider, connect } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router } from 'react-router';
import { browserHistory } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import { client } from '@/graphql/apollo';
import routes from '@/views/routes';
import store from '@/redux';
import '@/less/index.less';


const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing')
      .toJS();
  }
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
