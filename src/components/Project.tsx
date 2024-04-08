import * as React from "react";
import { graphql } from 'relay-runtime';
import { useFragment } from "react-relay";
import type {ProjectFragment$key} from './__generated__/ProjectFragment.graphql';

type Props = {
  project: ProjectFragment$key;
};

const ProjectFragment = graphql`
  fragment ProjectFragment on Project {
    owner {
      uuid
    }
    name
    description
  }
`;

export default function Project({project}: Props) {
  const data = useFragment<ProjectFragment$key>(ProjectFragment, project);
  return (
    <div className="newsfeed">
      <div>Owner: {data.owner.uuid}</div>
      <div>Name: {data.name}</div>
      <div>Description: {data.description}</div>
    </div>
  );
}

