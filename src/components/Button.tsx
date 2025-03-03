import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

export const Button = ({ className, ...rest }: ButtonProps) => {
  return (
    <button
      className={cn(
        "h-12 px-5 bg-cyan-500 font-medium rounded-sm flex gap-2 items-center justify-center hover:bg-cyan-600 transition-colors duration-300 cursor-pointer",
        className
      )}
      {...rest}
    />
  );
};
