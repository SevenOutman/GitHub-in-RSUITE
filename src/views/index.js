import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

function Root({ routes, children }) {

  const documentTitle = () => {
    return routes.reduce((currentTitle, { title = currentTitle }) => title, '');
  };

  return (
    <Fragment>
      <Helmet>
        <title>{documentTitle()}</title>
      </Helmet>
      {children}
    </Fragment>
  );
}

export default Root;
