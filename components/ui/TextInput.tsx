import { forwardRef, type ComponentPropsWithoutRef } from "react";

type TextInputProps = ComponentPropsWithoutRef<"input">;

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ className, ...props }, ref) {
    return (
      <input
        className={joinClasses("input input-bordered h-11 w-full", className)}
        ref={ref}
        {...props}
      />
    );
  },
);
