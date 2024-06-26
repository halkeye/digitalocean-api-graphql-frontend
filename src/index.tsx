import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./style.css";

import AppRoot from "./components/App";

function Routes() {
  return <AppRoot />;
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<Routes />);
