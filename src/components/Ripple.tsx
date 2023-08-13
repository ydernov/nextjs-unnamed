import { FC, useCallback, useRef, useState } from "react";

type RippleProps = {
  cx: number;
  cy: number;
  r: number;
  timeStamp: number;
};

type RippleRef = {
  ref: SVGCircleElement | null;
  mouseUp: boolean;
  timeStamp: number;
  transitionFn: (() => void) | null;
};

const calcRadius = (
  centerX: number,
  centerY: number,
  cornerX: number,
  cornerY: number
) =>
  Math.ceil(
    Math.sqrt(Math.pow(cornerX - centerX, 2) + Math.pow(cornerY - centerY, 2))
  );

export const Ripple: FC<React.SVGProps<SVGSVGElement>> = ({
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  className,
  ...props
}) => {
  const rippleRefs = useRef<RippleRef[]>([]);
  const [ripples, ripplesSet] = useState<RippleProps[]>([]);

  const handleMouseDown: typeof onMouseDown = ({
    timeStamp,
    button,
    currentTarget,
    clientX,
    clientY,
  }) => {
    // prevent ripple spam
    if (button === 0) {
      const { x, y, width, height } = currentTarget.getBoundingClientRect();

      // ripple center
      const cx = clientX - x;
      const cy = clientY - y;

      // ripple radius is the distance between cx cy and the most distant corner's x and y (local coords)
      const r = Math.max(
        calcRadius(cx, cy, 0, 0),
        calcRadius(cx, cy, width, 0),
        calcRadius(cx, cy, 0, height),
        calcRadius(cx, cy, width, height)
      );

      rippleRefs.current.push({
        timeStamp,
        ref: null,
        mouseUp: false,
        transitionFn: null,
      });

      if (ripples.length > 10) {
        rippleRefs.current.shift();
        ripplesSet(([_, ...rest]) =>
          rest.concat({
            cx,
            cy,
            r,
            timeStamp,
          })
        );
      } else {
        ripplesSet((ripples) => {
          return [
            ...ripples,
            {
              cx,
              cy,
              r,
              timeStamp,
            },
          ];
        });
      }
    }
  };

  const handleMouseUp: typeof onMouseUp = ({ timeStamp }) => {
    cleanupByMouse(timeStamp);
  };

  const hanndleMouseLeave: typeof onMouseLeave = ({ timeStamp }) => {
    cleanupByMouse(timeStamp);
  };

  const cleanupByMouse = (timeStamp: number) => {
    rippleRefs.current.forEach((ripple) => {
      if (ripple.timeStamp <= timeStamp && ripple.ref) {
        ripple.mouseUp = true;
        ripple.ref.getAnimations().at(1)?.cancel();
        ripple.transitionFn?.();
      }
    });
  };

  const setRippleRef = useCallback(
    (ripple: SVGCircleElement | null, timeStamp: number) => {
      if (ripple !== null) {
        const refElem = rippleRefs.current.find(
          (elem) => elem.timeStamp === timeStamp
        );

        if (refElem) {
          refElem.ref = ripple;

          ripple.onanimationend = function (event) {
            // setTimeout used to push style change to the next browser paint cycle

            if (event.animationName === "ripple" && refElem.mouseUp) {
              // must be equal to animation's 100% keyframe value
              ripple.classList.add("opacity-5");

              setTimeout(() => {
                ripple.classList.replace("duration-0", "duration-200");
                setTimeout(() => {
                  ripple.classList.replace("opacity-5", "opacity-0");
                });
              });
            } else {
              // must be equal to animation's 100% keyframe value
              ripple.classList.add("opacity-30");

              setTimeout(() => {
                ripple.classList.replace("duration-0", "duration-500");
              });

              refElem.transitionFn = () =>
                ripple.classList.replace("opacity-30", "opacity-0");
            }
          };

          ripple.ontransitionend = function () {
            const index = rippleRefs.current.findIndex(
              (r) => r.timeStamp === timeStamp
            );
            index !== -1 && rippleRefs.current.splice(index, 1);
            ripplesSet((ripples) =>
              ripples.filter((r) => r.timeStamp !== timeStamp)
            );
          };
        }
      }
    },
    []
  );

  return (
    <svg
      width={"100%"}
      height={"100%"}
      xmlns="http://www.w3.org/2000/svg"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={hanndleMouseLeave}
      className={`absolute top-0 left-0 ${className}`}
      {...props}
    >
      {ripples.map(({ timeStamp, ...props }) => (
        <circle
          key={timeStamp}
          ref={(ref) => {
            setRippleRef(ref, timeStamp);
            return ref;
          }}
          className="animate-[ripple_0.6s,rippleFill_0.6s] origin-center [transform-box:fill-box] fill-current transition-opacity duration-0 transform-gpu"
          {...props}
        />
      ))}
    </svg>
  );
};
