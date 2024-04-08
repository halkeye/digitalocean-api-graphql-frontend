import * as React from "react";
import Project from './Project';
import { graphql } from 'relay-runtime';
import { useLazyLoadQuery } from "react-relay";

// https://relay.dev/docs/api-reference/use-pagination-fragment/
//
import type {ProjectsListQuery as ProjectsListQueryType} from './__generated__/ProjectsListQuery.graphql';

const ProjectsListQuery = graphql`
  query ProjectsListQuery {
    projects {
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
  const data = useLazyLoadQuery<ProjectsListQueryType>(ProjectsListQuery, {});
  return (
    <div className="newsfeed">
      {data.projects.edges.map(({ node: project}) => (
        <div key={project.id} style={{ borderBottom: '1px solid black' }}>
          <Project project={project} />
        </div>
      ))}
    </div>
  );
}

