import { FC, memo } from "react";
import classes from "../style.module.css";
import clsx from "clsx";

/**
 * @type {isDragging} - The  function that determines if the draggable item is being dragged or not.
 * @type {position} - The  current position of the draggable item in pixels relative to its parent container.
 */
type ThumbProps = {
  isDragging: boolean;
  position: number;
};

const Thumb: FC<ThumbProps> = memo(({ position, isDragging }) => {
  return (
    <div
      className={classes.sliderThumbWrapper}
      style={{ left: position + "%" }}
    >
      <span
        id="thumb"
        className={clsx(classes.sliderThumb, isDragging ? "scale-150" : "")}
      ></span>
    </div>
  );
});

export default Thumb;
