import clsx from "clsx";
import { ReactNode, forwardRef, memo } from "react";
import classes from "../style.module.css";

/**
 * @type {isDragging} - The  function that determines whether the component is being dragged or not.
 * @type {children} -  The  content of the card. It can be a string, number or any valid react node.
 */
type RailProps = {
  isDragging: boolean;
  children: ReactNode;
};

const Rail = memo(
  forwardRef<HTMLDivElement, RailProps>(({ isDragging, children }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(classes.sliderRail, isDragging ? "bg-opacity-70" : "")}
      >
        {children}
      </div>
    );
  })
);

export default Rail;
