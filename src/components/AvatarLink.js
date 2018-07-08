// @flow
import React from 'react';
import { Link } from 'react-router';
import type { Actor } from '@/flow/graphql-types';

type Props = {
  actor: Actor;
  size?: number;
}

function AvatarLink({ actor, size }: Props) {
  return (
    <Link to={`/${actor.login}`}>
      <img src={actor.avatarUrl} alt={`@${actor.login}`} style={{ width: size }} />
    </Link>
  );
}

export default AvatarLink;