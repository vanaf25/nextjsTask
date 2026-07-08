import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "sm" | "page";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-teal-700 bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-300",
  secondary:
    "border-slate-300 text-slate-700 hover:bg-slate-100 focus:ring-slate-200",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-5 disabled:opacity-60",
  sm: "h-10 px-4 disabled:opacity-50",
  page: "h-10 min-w-10 px-3 disabled:opacity-50",
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  className,
  size = "sm",
  type = "button",
  variant = "secondary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={joinClasses(
        "inline-flex cursor-pointer items-center justify-center rounded-md border text-sm font-semibold transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      type={type}
      {...props}
    />
  );
}
