import React from 'react';
import { Button } from 'rsuite';
import { Link } from 'react-router';


function LinkButton(props) {
  return (
    <Button componentClass={Link} {...props} />
  );
}

export default LinkButton;