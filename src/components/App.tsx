import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { RelayEnvironmentProvider, loadQuery } from 'react-relay';
import GithubCorner from 'react-github-corner';
import ErrorPage from "../error-page";
import Root from "../routes/root";
import ProjectsList, { ProjectsListQuery } from "./ProjectsList";
import Project, { ProjectQuery } from "./Project";
import environment from "../relay/environment";
import { ErrorBoundary } from "react-error-boundary";
import { SidebarQuery } from "./Sidebar";

// const logError = (error: Error, info: { componentStack: string }) => {
//   console.error(error, info);
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: async function loader() {
      // Fixme, should be RootQuery since app only knows about root
      const queryReference = loadQuery(environment, SidebarQuery, {})
      return { queryReference };
    },
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/projects",
        loader: async function loader() {
          const queryReference = loadQuery(environment, ProjectsListQuery, {})
          return { queryReference };
        },
        element: <React.Suspense><ProjectsList /></React.Suspense>,
      },
      {
        path: "/projects/:id",
        loader: async function loader({ params }) {
          const queryReference = loadQuery(environment, ProjectQuery, {id: params.id})
          return { queryReference };
        },
        ErrorBoundary: ErrorBoundary,
        element: <Project />
        // element: <ErrorBoundary onError={logError} fallback={<div>Something went wrong</div>}><Project /></ErrorBoundary>,
      },
    ]
  }
]);

// The above component needs to know how to access the Relay environment, and we
// need to specify a fallback in case it suspends:
// - <RelayEnvironmentProvider> tells child components how to talk to the current
//   Relay Environment instance
// - <Suspense> specifies a fallback in case a child suspends.
export default function AppRoot() {
  return (
    <React.StrictMode>
      <RelayEnvironmentProvider environment={environment}>
        <GithubCorner href="https://github.com/halkeye/digitalocean-api-graphql-frontend" />
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </RelayEnvironmentProvider>
    </React.StrictMode>
  );
}
