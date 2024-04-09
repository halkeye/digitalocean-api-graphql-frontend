import * as React from "react";
import { graphql } from 'relay-runtime';
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import Project from './Project';
import LoadingSpinner from "./LoadingSpinner";
import type {ProjectsListQuery as ProjectsListQueryType} from './__generated__/ProjectsListQuery.graphql'
import type {ProjectsListFragment$key} from './__generated__/ProjectsListFragment.graphql';

// https://relay.dev/docs/api-reference/use-pagination-fragment/
//
// import type {ProjectsListQuery as ProjectsListQueryType} from './__generated__/ProjectsListQuery.graphql';

const ProjectsListQuery = graphql`
  query ProjectsListQuery {
    ...ProjectsListFragment
  }
`;

const ProjectsListFragment = graphql`
  fragment ProjectsListFragment on Query
    @refetchable(queryName: "ProjectsListPaginationQuery") 
    @argumentDefinitions(
      first: { type: "Int", defaultValue: 3 }
      after: { type: "String", defaultValue: null }
    ) {
    projects(first: $first, after: $after)
    @connection(key: "ProjectsList_projects") {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          ...ProjectFragment
        }
      }
    }
  }
`;
export default function ProjectsList() {
  const queryData = useLazyLoadQuery<ProjectsListQueryType>(ProjectsListQuery, {});
  const {
    data,
    loadNext,
    loadPrevious,
    hasNext,
    hasPrevious,
    isLoadingNext,
    isLoadingPrevious,
    refetch, // For refetching connection
  } = usePaginationFragment<ProjectsListQueryType, ProjectsListFragment$key>(ProjectsListFragment, queryData); 
  return (
    <div>
      {isLoadingNext && <LoadingSpinner />}
      {isLoadingPrevious && <LoadingSpinner />}
      {hasNext && <button onClick={() => loadNext(3)}>Load more projects</button>}
      {hasPrevious && <button onClick={() => loadPrevious(3)}>Load previous projects</button>}
      <button onClick={() => refetch({})}>Refetch</button>
      <div className="projects">
        {data.projects.edges.map(({ node: project}) => (
          <div key={project.id} style={{ borderBottom: '1px solid black' }}>
            <Project project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}

