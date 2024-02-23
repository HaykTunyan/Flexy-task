import { FC, memo } from "react";
import classes from "../style.module.css";
import { Positions as PositionsType } from "../types";

/**
 * @type {position} = The  position of the element in relation to its containing block.
 */
type PositionsPorps = {
  positions: PositionsType;
};

const Positions: FC<PositionsPorps> = memo(({ positions }) => {
  return (
    <div className={classes.sliderBreakpoints}>
      {positions.map((item) => (
        <div key={item} className={classes.sliderBreakpoint}>
          {item}
        </div>
      ))}
    </div>
  );
});

export default Positions;
