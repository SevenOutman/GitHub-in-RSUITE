// @flow
import React from 'react';
import { ButtonGroup, ButtonToolbar } from 'rsuite';
import LinkButton from '@/components/LinkButton';
import type { PageInfo } from '@/flow/graphql-types';
import { withRouter } from 'react-router';
import type { RouteProps } from '@/flow/react-router';

type Props = RouteProps & {
  pageInfo: PageInfo
}

function Pagination({ pageInfo, location }: Props) {
  const { startCursor, hasPreviousPage, endCursor, hasNextPage } = pageInfo;
  const { pathname, query } = location;
  return (
    <ButtonToolbar>
      <ButtonGroup>
        <LinkButton
          to={{ pathname, query: { ...query, after: null, before: startCursor } }}
          disabled={!hasPreviousPage}
        >
          Previous
        </LinkButton>
        <LinkButton
          to={{ pathname, query: { ...query, before: null, after: endCursor } }}
          disabled={!hasNextPage}
        >
          Next
        </LinkButton>
      </ButtonGroup>
    </ButtonToolbar>
  );
}

export default withRouter(Pagination);
