"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import {
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";
import { Ripple } from "../Ripple";

const variants = cva(
  [
    "rounded font-medium transition-colors duration-200 relative overflow-hidden select-none",
  ],
  {
    variants: {
      variant: {
        text: ["bg-transparent hover:bg-opacity-5", "dark:hover:bg-opacity-10"],
        contained: "drop-shadow-lg",
        outlined: [
          "bg-transparent [border-width:1px] border-opacity-50",
          "hover:border-opacity-100 hover:bg-opacity-5",
          "dark:border-opacity-50",
          "dark:hover:border-opacity-100 dark:hover:bg-opacity-10",
        ],
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-2", "px-4"],
        large: ["text-lg", "py-3", "px-6"],
      },
      disabled: {
        true: "pointer-events-none",
        false: "",
      },
      color: {
        primary: "",
        success: "",
        error: "",
      },
      loading: {
        true: "cursor-wait",
        false: "",
      },
    },
    compoundVariants: [
      {
        color: "primary",
        variant: "text",
        class: [
          "text-sky-700 hover:bg-sky-800",
          "dark:text-sky-400 dark:hover:bg-sky-500",
        ],
      },
      {
        color: "primary",
        variant: "contained",
        class: [
          "bg-sky-700 text-slate-50 hover:bg-sky-800",
          "dark:bg-sky-400 dark:text-slate-900 dark:hover:bg-sky-500",
        ],
      },

      {
        color: "primary",
        variant: "outlined",
        class: [
          "text-sky-700 border-sky-700 hover:bg-sky-800",
          "dark:text-sky-400 dark:border-sky-400 dark:hover:bg-sky-500 ",
        ],
      },

      {
        color: "success",
        variant: "text",
        class: [
          "text-green-700 hover:bg-green-800",
          "dark:text-green-400 dark:hover:bg-green-500",
        ],
      },
      {
        color: "success",
        variant: "contained",
        class: [
          "bg-green-700 text-slate-50 hover:bg-green-800",
          "dark:bg-green-400 dark:text-slate-900 dark:hover:bg-green-500",
        ],
      },

      {
        color: "success",
        variant: "outlined",
        class: [
          "text-green-700 border-green-700 hover:bg-green-800",
          "dark:text-green-400 dark:border-green-400 dark:hover:bg-green-500 ",
        ],
      },

      {
        color: "error",
        variant: "text",
        class: [
          "text-red-700 hover:bg-red-800",
          "dark:text-red-400 dark:hover:bg-red-500",
        ],
      },
      {
        color: "error",
        variant: "contained",
        class: [
          "bg-red-700 text-slate-50 hover:bg-red-800",
          "dark:bg-red-400 dark:text-slate-900 dark:hover:bg-red-500",
        ],
      },

      {
        color: "error",
        variant: "outlined",
        class: [
          "text-red-700 border-red-700 hover:bg-red-800",
          "dark:text-red-400 dark:border-red-400 dark:hover:bg-red-500 ",
        ],
      },

      {
        variant: "outlined",
        size: "small",
        class: "py-[calc(0.25rem-1px)] px-[calc(0.5rem-1px)]",
      },
      {
        variant: "outlined",
        size: "medium",
        class: "py-[calc(0.5rem-1px)] px-[calc(1rem-1px)]",
      },
      {
        variant: "outlined",
        size: "large",
        class: "py-[calc(0.75rem-1px)] px-[calc(1.5rem-1px)]",
      },
      {
        variant: "text",
        color: ["primary", "error", "success"],
        disabled: true,
        class: ["text-gray-400/50", "dark:text-gray-400/50"],
      },
      {
        variant: "contained",
        color: ["primary", "error", "success"],
        disabled: true,
        class: [
          "text-gray-400/50 bg-gray-300/50 drop-shadow-none",
          "dark:text-gray-400/50 dark:bg-gray-300/20 dark:drop-shadow-none",
        ],
      },
      {
        variant: "outlined",
        color: ["primary", "error", "success"],
        disabled: true,
        class: [
          "text-gray-400/50 border-gray-400",
          "dark:text-gray-400/50 dark:border-gray-400",
        ],
      },
    ],
    defaultVariants: {
      color: "primary",
      variant: "contained",
      size: "medium",
      disabled: false,
    },
  }
);

export type ButtonProps<Component extends ElementType = "button"> =
  ComponentPropsWithRef<Component> &
    VariantProps<typeof variants> & {
      icon?: ReactNode;
      contentClassName?: HTMLAttributes<"span">["className"];
    };

export const Button = forwardRef(
  (
    {
      className,
      children,
      color,
      variant,
      size,
      icon,
      disabled,
      loading,
      onClick,
      contentClassName,
      ...props
    }: ButtonProps,
    ref: ButtonProps["ref"]
  ) => {
    const handleClick: typeof onClick = (event) => {
      (!loading || !disabled) && onClick?.(event);
    };

    const f: HTMLAttributes<"span">["className"] = "gap";

    // const spanGapClass =
    //   size === "small" ? "gap-1" : size === "large" ? "gap-3" : "gap-2";

    const spanGapClass = "gap-5";

    return (
      <button
        ref={ref}
        className={twMerge(
          variants({
            color,
            variant,
            size,
            disabled,
            loading: Boolean(loading),
            className,
          }),

          "group"
        )}
        onClick={handleClick}
        disabled={disabled}
        {...props}
      >
        <span className="group-focus-visible:block focused-state absolute hidden inset-0 m-auto aspect-square">
          <span className="absolute inset-0 m-auto w-[70%] h-[70%]">
            <span className="animate-[2s_linear_0s_infinite_alternate_ping] absolute h-full w-full rounded-full bg-current opacity-20" />
            <span className="relative inline-flex rounded-full h-full w-full opacity-20 bg-current" />
          </span>
        </span>
        <Ripple />
        <span
          className={twMerge(
            `flex items-center z-10  ${spanGapClass}`,
            contentClassName
          )}
        >
          {loading ? <Loader2 className="animate-spin " size={"1em"} /> : icon}
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
