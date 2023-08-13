"use client";

import Image from "next/image";
import { Button } from "@/components/Buttom/Button";
import { FC } from "react";

const btnSize = ["small", "medium", "large", undefined] as const;
const btnColor = ["primary", "success", "error", undefined] as const;
const btnVariant = ["text", "contained", "outlined", undefined] as const;
const disabledState = [true, false, undefined] as const;

export default function Home() {
  return (
    <main className="">
      <>
        {btnSize.map((size) => (
          <ButtonDisplaySize
            key={`${size}`}
            size={size}
            variants={btnVariant}
            colors={btnColor}
            disabledStates={disabledState}
          />
        ))}
      </>
    </main>
  );
}

const ButtonDisplayColor: FC<{
  size: (typeof btnSize)[number];
  variant: (typeof btnVariant)[number];
  color: (typeof btnColor)[number];
  disabledStates: typeof disabledState;
}> = ({ size, variant, color, disabledStates }) => {
  return (
    <div>
      <p>{color ? color : "default"}</p>
      <div className="flex items-center flex-wrap  p-10  gap-6">
        {disabledStates.map((disabled, i) => (
          <Button
            key={`${color}_${disabled}`}
            size={size}
            variant={variant}
            color={color}
            disabled={disabled}
            loading={i % 2 === 0}
          >
            Button
          </Button>
        ))}
      </div>
    </div>
  );
};

const ButtonDisplayVariant: FC<{
  size: (typeof btnSize)[number];
  variant: (typeof btnVariant)[number];
  colors: typeof btnColor;
  disabledStates: typeof disabledState;
}> = ({ variant, colors, ...rest }) => {
  return (
    <div>
      <p>{variant ? variant : "default"}</p>
      <div>
        {colors.map((color) => (
          <ButtonDisplayColor
            key={`${colors}`}
            variant={variant}
            color={color}
            {...rest}
          />
        ))}
      </div>
    </div>
  );
};

const ButtonDisplaySize: FC<{
  size: (typeof btnSize)[number];
  variants: typeof btnVariant;
  colors: typeof btnColor;
  disabledStates: typeof disabledState;
}> = ({ variants, size, ...rest }) => {
  return (
    <div>
      <p>{size ? size : "default"}</p>
      <div>
        {variants.map((variant) => (
          <ButtonDisplayVariant
            key={`${variant}`}
            size={size}
            variant={variant}
            {...rest}
          />
        ))}
      </div>
    </div>
  );
};
