import * as React from "react";
import { graphql } from 'relay-runtime';
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { useLoaderData } from "react-router-dom"
import type { ProjectQuery as ProjectQueryType } from "./__generated__/ProjectQuery.graphql";

// import ResourcesList from "./ResourcesList";

export const ProjectQuery = graphql`
  query ProjectQuery($id: ID!) {
    node(id: $id) {
      ...on Project {
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
      }
    }
  }
`

type Props = {
  queryReference: PreloadedQuery<ProjectQueryType>
};

export default function Project() {
  const props = useLoaderData() as Props;
  const data = usePreloadedQuery<ProjectQueryType>(ProjectQuery, props.queryReference);
  // React.useEffect(() => props.queryReference.dispose(), [props.queryReference])
  return (
    <React.Suspense>
      <div className="col-span-1 bg-white border border-gray-300">
        <div>Owner: {data.node.owner.uuid}</div>
        <div>Name: {data.node.name}</div>
        <div>Description: {data.node.description}</div>
        <div>Purpose: {data.node.purpose}</div>
        <div>Environment: {data.node.environment}</div>
        <div>Is Default: {data.node.isDefault ? "true" : "false"}</div>
        <div>Created At: {data.node.createdAt}</div>
        <div>Updated At: {data.node.updatedAt}</div>
        {/* <ResourcesList data={data} project={query} /> */}
      </div>
    </React.Suspense>
  );
}

