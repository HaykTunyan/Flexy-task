import { Fragment, useState } from "react";
import Slider from "./Slider";

function App() {

  // The slider state.
  const positionsA = [0, 10, 20, 30, 40, 50];
  const [valueA, onChangeA] = useState(positionsA[1]);
  // The second slider state.
  const positionsB = [0, 200, 400, 600];
  const [valueB, onChangeB] = useState(positionsB[2]);
  // The third slider state.
  const positionsC = [
    0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
  ];
  const [valueC, onChangeC] = useState(positionsC[0]);

  return (
    <Fragment>
      <div className="container m-auto">
      <div className="pt-32" />
      <div className="grid grid-cols-2 gap-4 p-4">
        <Slider positions={positionsA} value={valueA} onChange={onChangeA} />

        <Slider positions={positionsB} value={valueB} onChange={onChangeB} />
      </div>
      <div className="p-4">
        <Slider positions={positionsC} value={valueC} onChange={onChangeC} />
      </div>
      </div>
    </Fragment>
  );
}

export default App;
