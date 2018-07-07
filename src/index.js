// polyfills
import 'babel-polyfill';

// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';

// Apollo
import { createClient } from '@/graphql/apollo';

// bootstrap React App

createClient()
  .then((apolloClient) => {
    ReactDOM.render(<App apolloClient={apolloClient} />, document.getElementById('root'));
  });
