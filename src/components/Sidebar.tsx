import * as React from "react";
import type {AppsQuery$data, AppsQuery as AppsQueryType} from './__generated__/AppsQuery.graphql'
import { graphql } from 'relay-runtime';
import { usePaginationFragment } from "react-relay";
import { SidebarFragment$key } from "./__generated__/SidebarFragment.graphql";
import LoadingSpinner from "./LoadingSpinner";
import Button from "./Button";

type Props = {
  query: AppsQuery$data
}

const SidebarFragment = graphql`
  fragment SidebarFragment on Query
    @refetchable(queryName: "SidebarPaginationQuery") 
    @argumentDefinitions(
      first: { type: "Int", defaultValue: 25 }
      after: { type: "String", defaultValue: null }
    ) {
    sidebarProjects: projects(first: $first, after: $after)
    @connection(key: "Sidebar__sidebarProjects") {
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

export default function Sidebar({ query }: Props): React.ReactElement {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext,
  } = usePaginationFragment<AppsQueryType, SidebarFragment$key>(SidebarFragment, query);

  return (
    <>
      {isLoadingNext && <LoadingSpinner />}
      {[...data.sidebarProjects.edges].sort((a, b) => a.node.name.localeCompare(b.node.name)).map(({node: project}) => {
        return (
          <a key={project.id} className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300" href="#">
            <span className="leading-none">{project.name}</span>
          </a>
        )
      })}
      {hasNext && <div><Button onClick={() => loadNext(15)}>Load more projects</Button></div>}
    </>
  );
}