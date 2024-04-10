import * as React from "react";
import { graphql } from 'relay-runtime';
import { usePaginationFragment } from "react-relay";
import LoadingSpinner from "./LoadingSpinner";
import Button from "./Button";
import Resource from "./Resource";
import { ProjectsListQuery } from "./__generated__/ProjectsListQuery.graphql";
import { ResourcesListFragment$key } from "./__generated__/ResourcesListFragment.graphql";
import { ProjectFragment$data, ProjectFragment$key } from "./__generated__/ProjectFragment.graphql";

type Props = {
  project: ProjectFragment$key;
  data: ProjectFragment$data;
}

const ResourcesListFragment = graphql`
  fragment ResourcesListFragment on Project
    @refetchable(queryName: "ResourcesListPaginationQuery") 
    @argumentDefinitions(
      first: { type: "Int", defaultValue: 3 }
      after: { type: "ID", defaultValue: null }
    ) {
    resources(first: $first, after: $after)
    @connection(key: "ResourcesList__resources") {
      edges {
        node {
          id
          ...ResourceFragment
        }
      }
    }
  }
`;
export default function ResourcesList({ project, data: upData }: Props) {
  console.log({ project, upData})
  const {
    data,
    loadNext,
    loadPrevious,
    hasNext,
    hasPrevious,
    isLoadingNext,
    isLoadingPrevious,
    refetch, // For refetching connection
  } = usePaginationFragment<ProjectsListQuery, ResourcesListFragment$key>(ResourcesListFragment, upData);
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4">
        {(isLoadingNext || isLoadingPrevious) && <LoadingSpinner />}
        {hasNext && <div><Button onClick={() => loadNext(3)}>Load more Resources</Button></div>}
        <div><Button onClick={() => refetch({})}>Refresh</Button></div>
        {hasPrevious && <div><Button onClick={() => loadPrevious(3)}>Load previous Resources</Button></div>}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.resources.edges.map(({ node: resource}) => (
          <div className="w-full" key={resource.id} style={{ borderBottom: '1px solid black' }}>
            <Resource resource={resource} />
          </div>
        ))}
      </div>
    </div>
  );
}

