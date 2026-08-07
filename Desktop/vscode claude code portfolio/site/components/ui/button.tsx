import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-semibold uppercase tracking-[0.14em] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "btn-primary",
        secondary: "btn-secondary",
        ghost: "text-[var(--fg-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--fg)]",
      },
      size: {
        default: "h-11 px-7",
        sm: "h-9 px-5 text-[11px]",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
