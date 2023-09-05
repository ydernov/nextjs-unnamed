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
    // only on main mouse button (leftclick)
    if (button === 0) {
      const { x, y, width, height } = currentTarget.getBoundingClientRect();

      // ripple center
      const cx = clientX - x;
      const cy = clientY - y;

      // use smart maths to calculate the distance to the farthest corner
      const r = Math.hypot(Math.max(cx, width - cx), Math.max(cy, height - cy));

      rippleRefs.current.push({
        timeStamp,
        ref: null,
        mouseUp: false,
        transitionFn: null,
      });

      // prevent ripple spam
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

  const removeCircleByTimestamp = (timeStamp: number) => {
    const index = rippleRefs.current.findIndex(
      (r) => r.timeStamp === timeStamp
    );
    index !== -1 && rippleRefs.current.splice(index, 1);
    ripplesSet((ripples) => ripples.filter((r) => r.timeStamp !== timeStamp));
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
            if (event.animationName === "ripple" && refElem.mouseUp) {
              removeCircleByTimestamp(timeStamp);
            } else {
              ripple.getAnimations().at(0)?.commitStyles();
              ripple.getAnimations().at(1)?.commitStyles();
              ripple.classList.remove("[animation-fill-mode:forwards]");
              refElem.transitionFn = () => {
                ripple.style.opacity = "0";
              };
            }
          };

          ripple.ontransitionend = function () {
            removeCircleByTimestamp(timeStamp);
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
      className={`
        absolute top-0 left-0 ${className} overflow-hidden 
        [filter:grayscale(0)] transform-gpu
      `}
      {...props}
      /*
        [filter:grayscale(0)] and transform-gpu are here to reduce possible flickering in chrome
        usually happens with slow ripples over a big container
      */
    >
      {ripples.map(({ timeStamp, ...props }) => (
        <circle
          key={timeStamp}
          ref={(ref) => {
            setRippleRef(ref, timeStamp);
            return ref;
          }}
          className={`
            origin-center [transform-box:fill-box] fill-current opacity-20
            will-change-[transform, opacity]
            transition-opacity duration-500
            animate-[0.6s_ease-in_ripple,0.6s_ease-in_rippleFill] [animation-fill-mode:forwards] 
          `}
          {...props}
        />
      ))}
    </svg>
  );
};
