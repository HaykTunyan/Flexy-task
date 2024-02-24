import {
  FC,
  MouseEvent,
  TouchEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./style.module.css";
import {
  convertPositionsToBreakpoints,
  calculateThumbPosition,
  findOffsetXByValue,
} from "./helpers";
import Rail from "./components/Rail";
import Thumb from "./components/Thumb";
import Positions from "./components/Positions";
import Track from "./components/Track";
import { Breakpoints, Positions as PositionsType } from "./types";

/**
 * @type {positions} - The  positions of the slider's thumb(s) in percentages (0-100).
 * @type {value} - The value of the slider's thumb(s).
 * @function onChange - A callback function that is called when the user stops dragging a thumb.
 */
type SliderProps = {
  positions: PositionsType;
  value: number;
  onChange?: (value: number) => void;
};

const Slider: FC<SliderProps> = memo(({ positions, value, onChange }) => {

  const [, setActiveValue] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [breakpoints, setBreakpoints] = useState<Breakpoints>([]);

  const railRef = useRef<HTMLDivElement>(null);

  const handleActiveValueChange = useCallback(
    (value: number, cb?: (value: number) => void) => {
      const currentBreakpoint = breakpoints.find(
        (bp) => bp.matchRange[0] <= value && bp.matchRange[1] >= value
      );

      if (currentBreakpoint) {
        setActiveValue(currentBreakpoint.label);
        setOffsetX(currentBreakpoint.labelPositionInPercent);
        cb?.(currentBreakpoint.label);
      }
    },
    [breakpoints]
  );

  /**
   *  Mouse Event Function.
   */

  const handleMouseDown = useCallback((event: MouseEvent) => {
    event.preventDefault();
    const target = event.target as HTMLDivElement;

    if (target.id === "thumb") {
      setIsDragging(true);
    }
  }, []);

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      if (!isDragging) {
        return;
      }
      setIsDragging(false);
      const thumbPosition = calculateThumbPosition(railRef, event);

      if (thumbPosition !== undefined) {
        handleActiveValueChange(thumbPosition, onChange);
      }
    },
    [isDragging, setIsDragging, handleActiveValueChange, onChange]
  );

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) {
      return;
    }

    const thumbPosition = calculateThumbPosition(railRef, event);

    if (thumbPosition !== undefined) {
      handleActiveValueChange(thumbPosition);
    }
  };

  /**
   *  Touch Event Function.
  */

  const handleTouchStart = useCallback((event: TouchEvent) => {
    const target = event.target as HTMLDivElement;
  
    if (target.id === "thumb") {
      setIsDragging(true);
    }
  }, []);

  const handleTouchEnd = useCallback((event: TouchEvent) => {
    if (!isDragging) {
      return;
    }
    setIsDragging(false);
    const touch = event.changedTouches[0];
    // @ts-ignore
    //  This line is necessary for using the ts ignore.
    const thumbPosition = calculateThumbPosition(railRef, touch);

    if (thumbPosition !== undefined) {
      handleActiveValueChange(thumbPosition, onChange);
    }
  }, [isDragging, setIsDragging, handleActiveValueChange, onChange]);

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!isDragging) {
        return;
      }

      const touch = event.changedTouches[0];
      // @ts-ignore
      //  This line is necessary for using the ts ignore.
      const thumbPosition = calculateThumbPosition(railRef, touch);

      if (thumbPosition !== undefined) {
        handleActiveValueChange(thumbPosition);
      }
    },
    [isDragging, handleActiveValueChange]
  );
  
  // The UseEffect on value set/change calculate offsetX and set active value.
  useEffect(() => {
    const isBreakpointsCalculated = !!breakpoints.length;

    if (!isBreakpointsCalculated || value === undefined) {
      return;
    }

    const isValidValueProvided = breakpoints.find((bp) => bp.label === value);

    if (!isValidValueProvided) {
      return;
    }

    const offsetX = findOffsetXByValue(value, breakpoints);

    if (offsetX !== undefined) {
      setOffsetX(offsetX);
      setActiveValue(value);
    }
  }, [breakpoints, value]);

  // The UseEffect as convert positions to breakpoints.
  useEffect(() => {
    const sliderWidth = railRef.current?.getBoundingClientRect()
      .width as number;

    const breakpoints = convertPositionsToBreakpoints(positions, sliderWidth);
    setBreakpoints(breakpoints);
  }, [positions]);

  //  Yhe UseEffect as hide cursor on thumb move.
  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "default";
    }
  }, [isDragging]);

  return (
    <div
      className={classes.sliderContainer}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      <Rail ref={railRef} isDragging={isDragging}>
        <Thumb position={offsetX} isDragging={isDragging} />
        <Track width={offsetX} />
      </Rail>
      <Positions positions={positions} />
    </div>
  );
});

export default Slider;
