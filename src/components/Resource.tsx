import * as React from "react";
import { graphql } from 'relay-runtime';
import { useFragment } from "react-relay";
import type {ResourceFragment$key} from './__generated__/ResourceFragment.graphql';

type Props = {
  resource: ResourceFragment$key;
};

const ResourceFragment = graphql`
  fragment ResourceFragment on ProjectResource {
    __typename
    id
    assignedAt
    resource {
      __typename
    }
    status
  }
`;

export default function Resource({resource}: Props) {
  const data = useFragment<ResourceFragment$key>(ResourceFragment, resource);
  return (
    <div className="col-span-1 bg-white border border-gray-300">
      <div>__typename: {data.__typename}</div>
      <div>id: {data.id}</div>
      <div>assignedAt: {data.assignedAt}</div>
      <div>status: {data.status}</div>
    </div>
  );
}

