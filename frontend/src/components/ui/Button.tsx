"use client";

import * as React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading}
        className={`
          w-full flex justify-center items-center 
          px-4 py-2 rounded-md text-sm font-medium
          bg-blue-600 text-white hover:bg-blue-700 
          disabled:opacity-50 disabled:cursor-not-allowed
          transition
          ${className}
        `}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  }
);
Button.displayName = "Button";
