import React from "react";
import { Pane } from "evergreen-ui";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <Pane>
      <Outlet />
    </Pane>
  );
}

export default App;
