import { FC, memo } from "react";
import classes from "../style.module.css";

/**
 * @type {width} - The  width of the component in pixels.
 */
type TrackProps = {
  width: number;
};

const Track: FC<TrackProps> = memo(({ width }) => {
  const right = `calc(100% - ${width}%)`;

  return <div className={classes.sliderTrack} style={{ right }} />;
});

export default Track;
