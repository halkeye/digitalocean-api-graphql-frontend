import * as React from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { graphql } from 'relay-runtime';
import { PreloadedQuery, ReactRelayContext, usePreloadedQuery } from "react-relay";
import { SidebarQuery as SidebarQueryType } from './__generated__/SidebarQuery.graphql';

export const SidebarQuery = graphql`
  query SidebarQuery {
    projects(first: 100) {
      edges {
        node {
          name
          id
        }
      }
    }
  }
`

type Props = {
  queryReference: PreloadedQuery<SidebarQueryType>
};

export default function Sidebar(): React.ReactElement {
  const props = useLoaderData() as Props;
  const data = usePreloadedQuery<SidebarQueryType>(SidebarQuery, props.queryReference);
  // React.useEffect(() => props.queryReference.dispose(), [props.queryReference])
  // const data = { projects: { edges: [
  //   { node: { name: 'Gavin1', id: 'do:project:e69223b5-df91-42b1-b6dc-f60669f4b636' } },
  //   { node: { name: 'Gavin2', id: 'do:project:c1f72229-f6c5-44ef-82c8-269635719315' } }
  // ] } };
  return <>
    {[...data.projects.edges].sort((a, b) => a.node.name.localeCompare(b.node.name)).map(({node: project}) => {
      return (
        <NavLink 
          key={project.id}
          className={({ isActive }) => {
            return `flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300 ${isActive ? 'bg-blue-300' : ''}`
          }}
          to={`/projects/${project.id}`}
        >
          <span className="leading-none">{project.name}</span>
        </NavLink>
      )
    })}
  </>;
}