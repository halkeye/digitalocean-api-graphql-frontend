import * as React from "react";
import { graphql } from 'relay-runtime';
import { useFragment } from "react-relay";
import type {ProjectFragment$key} from './__generated__/ProjectFragment.graphql';
import ResourcesList from "./ResourcesList";

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
    purpose
    environment
    isDefault
    createdAt
    updatedAt
    ...ResourcesListFragment
  }
`;

export default function Project({project}: Props) {
  const data = useFragment<ProjectFragment$key>(ProjectFragment, project);
  return (
    <div className="col-span-1 bg-white border border-gray-300">
      <div>Owner: {data.owner.uuid}</div>
      <div>Name: {data.name}</div>
      <div>Description: {data.description}</div>
      <div>Purpose: {data.purpose}</div>
      <div>Environment: {data.environment}</div>
      <div>Is Default: {data.isDefault ? "true" : "false"}</div>
      <div>Created At: {data.createdAt}</div>
      <div>Updated At: {data.updatedAt}</div>
      <ResourcesList data={data} project={project} />
    </div>
  );
}

