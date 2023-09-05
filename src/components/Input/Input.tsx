"use client";
import {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  useId,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";

type FieldType = Extract<ElementType, "input" | "textarea">;

// works but only with this order and generics code:
// Type extends "input"
//   ? InputProps<Type, WithRef>
//   : TextareaProps<"textarea", WithRef>);
// for some reason for TextareaProps the string literate "textarea" works, while for InputProps Type is needed

export type InputComponentProps<
  Type extends FieldType,
  WithRef extends boolean
> = {
  label?: string;
} & (Type extends "input" ? InputProps<Type, WithRef> : TextareaProps<WithRef>);

// type TextareaProps<
//   FT extends Extract<FieldType, "textarea"> = Extract<FieldType, "textarea">,
//   WithRef extends boolean = false,
//   Props extends WithRef extends true
//     ? ComponentPropsWithRef<FT>
//     : ComponentPropsWithoutRef<FT> = WithRef extends true
//     ? ComponentPropsWithRef<FT>
//     : ComponentPropsWithoutRef<FT>
// > = {
//   fieldType: FieldType;
// } & Props;

type TextareaProps<
  WithRef extends boolean = false,
  Props extends WithRef extends true
    ? ComponentPropsWithRef<"textarea">
    : ComponentPropsWithoutRef<"textarea"> = WithRef extends true
    ? ComponentPropsWithRef<"textarea">
    : ComponentPropsWithoutRef<"textarea">
> = {
  fieldType: FieldType;
} & Props;

// FT generic is required for the prop types to work while using the component
type InputProps<
  FT extends Extract<FieldType, "input"> = Extract<FieldType, "input">,
  WithRef extends boolean = false,
  Props extends WithRef extends true
    ? ComponentPropsWithRef<FT>
    : ComponentPropsWithoutRef<FT> = WithRef extends true
    ? ComponentPropsWithRef<FT>
    : ComponentPropsWithoutRef<FT>
> = {
  fieldType: FT;
} & Omit<Props, "type"> & {
    type?: Extract<
      Props["type"],
      | "text"
      | "password"
      | "date"
      | "datetime-local"
      | "email"
      | "month"
      | "range"
      | "number"
      | "search"
      | "tel"
      | "time"
      | "url"
      | "week"
    >;
  };

const _Textarea = forwardRef(
  (
    { onChange, ...rest }: ComponentPropsWithoutRef<"textarea">,
    ref: ComponentPropsWithRef<"textarea">["ref"]
  ) => {
    return (
      <textarea
        onChange={(event) => {
          const { target } = event;
          target.style.height = "auto";
          target.style.height = target.scrollHeight + "px";
          onChange?.(event);
        }}
        ref={ref}
        maxLength={10}
        {...rest}
      />
    );
  }
);

_Textarea.displayName = "InnerTextarea";

const _Input = forwardRef(
  (
    props: ComponentPropsWithoutRef<"input">,
    ref: ComponentPropsWithRef<"input">["ref"]
  ) => {
    return <input ref={ref} {...props} />;
  }
);

_Input.displayName = "InnerInput";

function isInputProps(
  props: Partial<InputComponentProps<any, any>>,
  fieldType: InputComponentProps<any, any>["fieldType"]
): props is InputProps {
  return fieldType === "input" || !fieldType;
}

function isTextAreaProps(
  props: Partial<InputComponentProps<any, any>>,
  fieldType: InputComponentProps<any, any>["fieldType"]
): props is TextareaProps {
  return fieldType === "textarea";
}

// think of the ways to:
// - infer the ref type while using ComponentPropsWithoutRef interface
// - or fix the type errors for the Input component definition when using ComponentPropsWithRef
// - have default fieldType as "input" if set to optional

interface WithForwardRefType
  extends React.FC<InputComponentProps<FieldType, false>> {
  <T extends FieldType>(props: InputComponentProps<T, true>): ReturnType<
    React.FC<InputComponentProps<T, true>>
  >;
}

export const Input: WithForwardRefType = forwardRef(
  (
    { label, className, maxLength, onChange, value, fieldType, ...rest },
    ref
  ) => {
    const id = useId();
    const refff = useRef<HTMLSpanElement>(null);
    const inputClassName =
      "rounded bg-slate-800/5 peer outline-none mb-1 p-1 resize-none dark:bg-slate-200/5 placeholder:text-gray-400";

    const characterCounterIsAvailable = (
      _props: typeof rest,
      _value: typeof value,
      _maxLength: typeof maxLength
    ): _value is Exclude<typeof value, number> => {
      const textareaCheck = fieldType === "textarea";
      const inputCheck =
        fieldType === "input" &&
        (("type" in rest && rest.type !== "number") || !("type" in rest));
      const valueTypeCheck = typeof value !== "number";

      return (
        maxLength !== undefined &&
        (textareaCheck || inputCheck) &&
        valueTypeCheck
      );
    };

    const _onChange: ChangeEventHandler = (
      event: ChangeEvent<HTMLTextAreaElement> & ChangeEvent<HTMLInputElement>
    ) => {
      if (characterCounterIsAvailable(rest, event.target.value, maxLength)) {
        if (refff.current)
          refff.current.innerText = `${event.target.value.length}/${maxLength}`;
      }
      onChange?.(event);
    };

    const inputElem = isTextAreaProps(rest, fieldType) ? (
      <_Textarea
        id={id}
        className={inputClassName}
        onChange={_onChange}
        maxLength={maxLength}
        value={value}
        {...rest}
        ref={ref as ComponentPropsWithRef<"textarea">["ref"]}
      />
    ) : isInputProps(rest, fieldType) ? (
      <_Input
        id={id}
        className={inputClassName}
        onChange={_onChange}
        maxLength={maxLength}
        value={value}
        {...rest}
        ref={ref as ComponentPropsWithRef<"input">["ref"]}
      />
    ) : null;

    return (
      <div
        className={twMerge([
          "flex flex-col relative",
          "text-zinc-700 dark:text-white",
          "border-b-2 border-zinc-700 border-opacity-20",
          "dark:border-gray-400 dark:border-opacity-20",
          "hover:border-opacity-40 dark:hover:border-opacity-40",
          className,
        ])}
      >
        <label htmlFor={id} className="pb-1 font-semibold">
          {label}
        </label>
        {inputElem}
        <span
          className={twMerge([
            "absolute bottom-[-2px] h-[2px] w-full",
            "bg-zinc-700 dark:bg-gray-400",
            "origin-center scale-x-0 transition-transform",
            "peer-focus:scale-x-100 duration-300 ease-out",
          ])}
        />
        {characterCounterIsAvailable(rest, value, maxLength) ? (
          <span ref={refff} className="absolute bottom-1 right-1 text-xs">
            {`${value?.length || 0}/${maxLength}`}
          </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "TextInput";
