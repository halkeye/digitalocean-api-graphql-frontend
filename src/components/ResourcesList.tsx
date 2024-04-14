import * as React from "react";
import { graphql } from 'relay-runtime';
import { useFragment } from "react-relay";
import { ResourcesListFragment$data, ResourcesListFragment$key } from "./__generated__/ResourcesListFragment.graphql";
import { ProjectFragment$key } from "./__generated__/ProjectFragment.graphql";

type Props = {
  project: ProjectFragment$key;
}

const ResourcesListFragment = graphql`
  fragment ResourcesListFragment on Project {
    resources(first: 100) {
      edges {
        node {
          status
          id
          resource {
            id
            name
            __typename
          }
        }
      }
    }
  }
`;

const Status = ({ status }: { status: string}) => {
  return (
    <button type="button" className="rounded-full px-4 mr-2 bg-green-600 text-white p-2 leading-none flex items-center">
      {status}
    </button>
  );
}


export default function ResourcesList(props: Props) {
  const data = useFragment<ResourcesListFragment$key>(ResourcesListFragment, props.project);

  const resourceByType = data.resources.edges.filter(
    edge => Boolean(edge.node)
  ).reduce((prev, edge) => {
    prev[edge.node.resource?.__typename] ||= []
    prev[edge.node.resource?.__typename].push(edge.node)
    return prev
  },
  {} as Record<string, Array<ResourcesListFragment$data['resources']['edges'][0]['node']>>
  );

  return (
    <>
      {Object.entries(resourceByType).map(([__typename, resources]) => (
        <div key={__typename}>
          <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{__typename} ({resources.length})</h2>
          <div className="border-2">
            <table className="table-auto">
              <tbody>
                {resources.map(resource => {
                  return (
                    <tr key={resource.resource?.id}>
                      <td><Status status={resource.status} /></td>
                      <td>{resource.resource?.name}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}

