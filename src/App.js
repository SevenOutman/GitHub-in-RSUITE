import React from 'react';
import { Provider, connect } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router } from 'react-router';
import {
  hashHistory,
} from 'react-router';
import routes from '@/views/routes';
import store from '@/redux';
import '@/less/index.less';


const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState(state) {
    return state.get('routing')
      .toJS();
  }
});
function App() {

  return (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  );
}

export default App;
