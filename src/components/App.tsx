import * as React from "react";
import RelayEnvironment from "../relay/RelayEnvironment";
import { graphql } from 'relay-runtime';
import { useLazyLoadQuery, useFragment, usePaginationFragment } from "react-relay";
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import GithubCorner from 'react-github-corner';
import ProjectsList from "./ProjectsList";
import LoadingSpinner from "./LoadingSpinner";
// import type {AppQuery as AppQueryType, App_projects, App_projects$key} from './__generated__/AppQuery.graphql';

// // https://github.com/sibelius/relay-workshop/blob/a21e4b11ba1b4b3eea8c16aa72fe850f9434a860/solutions/04-usePaginationFragment/src/App.tsx

// export const AppQuery = graphql`
//   query AppQuery($count: Int, $after: String) {
//     ...App_projects @arguments(count: $count, after: $after)
//   }
// `

// export const appQueryVariables = {
// }

// const appConnectionFragment = graphql`
//   fragment App_projects on Query
//   @refetchable(queryName: "App_projects")
//   @argumentDefinitions(count: { type: "Int", defaultValue: 10 }, after: { type: "String" }) {
//     projects(first: $count, after: $after)
//       @connection(key: "App_projects") {
//       edges {
//         cursor
//         node {
//           id
//           ...ProjectsListFragment
//         }
//       }
//     }
//   }
// `


function App(): React.ReactElement {
  // const query = useLazyLoadQuery<AppQueryType>(AppQuery, {});
  // const { data, loadNext, isLoadingNext } = usePaginationFragment<App_projects, App_projects$key>(
  //   appConnectionFragment,
  //   query
  // )
  // console.log('data', data);
  return (
    <div className="app">
      <ProjectsList />
    </div>
  );
}

// The above component needs to know how to access the Relay environment, and we
// need to specify a fallback in case it suspends:
// - <RelayEnvironmentProvider> tells child components how to talk to the current
//   Relay Environment instance
// - <Suspense> specifies a fallback in case a child suspends.
export default function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <React.Suspense fallback={'Loading...'}>
        <GithubCorner href="https://github.com/halkeye/digitalocean-api-graphql-frontend" />
        <App />
      </React.Suspense>
    </RelayEnvironmentProvider>
  );
}
