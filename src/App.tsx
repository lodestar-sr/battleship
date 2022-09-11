import React, { Suspense } from "react";
import ShipBattle from "./pages/ShipBattle";

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <ShipBattle />
    </Suspense>
  );
};

export default App;
