import * as React from "react";
import RelayEnvironment from "../relay/RelayEnvironment";
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import GithubCorner from 'react-github-corner';
import ProjectsList from "./ProjectsList";

function App(): React.ReactElement {
  return (
    <div className="w-full">
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
