import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "sm" | "page";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-outline",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "btn-md",
  sm: "btn-sm",
  page: "btn-sm min-w-10 px-3",
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
        "btn cursor-pointer disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      type={type}
      {...props}
    />
  );
}
