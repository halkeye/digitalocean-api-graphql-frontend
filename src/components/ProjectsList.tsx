import * as React from "react";
import { graphql } from 'relay-runtime';
import { PreloadedQuery, usePaginationFragment, usePreloadedQuery } from "react-relay";
import { Link, useLoaderData } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner";
// import InfiniteScrollTrigger from "./InfiniteScrollTrigger";
import type { ProjectsListQuery as ProjectsListQueryType } from "./__generated__/ProjectsListQuery.graphql";
import type {ProjectsListFragment$key} from './__generated__/ProjectsListFragment.graphql';
import Button from "./Button";

export const ProjectsListQuery = graphql`
  query ProjectsListQuery {
    ...ProjectsListFragment 
  }
`

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
          name
        }
      }
    }
  }
`;

type Props = {
  queryReference: PreloadedQuery<ProjectsListQueryType>
}
export default function ProjectsList() {
  const props = useLoaderData() as Props;
  const query = usePreloadedQuery<ProjectsListQueryType>(ProjectsListQuery, props.queryReference);
  React.useEffect(() => props.queryReference.dispose(), [props.queryReference])
  const {
    data,
    loadNext,
    loadPrevious,
    hasNext,
    hasPrevious,
    isLoadingNext,
    isLoadingPrevious,
    refetch, // For refetching connection
  } = usePaginationFragment<ProjectsListQueryType, ProjectsListFragment$key>(ProjectsListFragment, query);
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
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
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


