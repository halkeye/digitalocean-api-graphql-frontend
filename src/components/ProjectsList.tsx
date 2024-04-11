import * as React from "react";
import { graphql } from 'relay-runtime';
import { usePaginationFragment } from "react-relay";
import Project from './Project';
import LoadingSpinner from "./LoadingSpinner";
// import InfiniteScrollTrigger from "./InfiniteScrollTrigger";
import type {AppsQuery$data, AppsQuery as AppsQueryType} from './__generated__/AppsQuery.graphql'
import type {ProjectsListFragment$key} from './__generated__/ProjectsListFragment.graphql';
import Button from "./Button";

// https://relay.dev/docs/api-reference/use-pagination-fragment/
//
// import type {ProjectsListQuery as ProjectsListQueryType} from './__generated__/ProjectsListQuery.graphql';

type Props = {
  query: AppsQuery$data
}

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
export default function ProjectsList({query}: Props) {
  const {
    data,
    loadNext,
    loadPrevious,
    hasNext,
    hasPrevious,
    isLoadingNext,
    isLoadingPrevious,
    refetch, // For refetching connection
  } = usePaginationFragment<AppsQueryType, ProjectsListFragment$key>(ProjectsListFragment, query);
  // const onEndReached = () => loadNext(3);
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4">
        {(isLoadingNext || isLoadingPrevious) && <LoadingSpinner />}
        {hasNext && <div><Button onClick={() => loadNext(3)}>Load more projects</Button></div>}
        <div><Button onClick={() => refetch({})}>Refresh</Button></div>
        {hasPrevious && <div><Button onClick={() => loadPrevious(3)}>Load previous projects</Button></div>}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.projects.edges.map(({ node: project}) => (
          <div className="w-full" key={project.id} style={{ borderBottom: '1px solid black' }}>
            <Project project={project} />
          </div>
        ))}
        {/* <InfiniteScrollTrigger
          onEndReached={onEndReached}
          hasNext={hasNext}
          isLoadingNext={isLoadingNext}
        /> */}
      </div>
    </div>
  );
}

