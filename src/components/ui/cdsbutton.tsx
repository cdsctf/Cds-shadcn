import React, { useState, useCallback, useRef } from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden relative select-none transition-shadow duration-200 ease-in-out ",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-sm active:shadow-2xl",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-md active:shadow-sm",
        outline: "border-2 border-primary bg-background hover:bg-primary/10 hover:shadow-md active:shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md active:shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-md active:shadow-sm",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-md px-8 text-lg",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface RippleStyle {
  left: number;
  top: number;
  scale: number;
  opacity: number;
}

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const CdsButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size, children, onClick, ...props }, ref) => {
    const [ripples, setRipples] = useState<Array<RippleStyle & { id: number }>>([]);
    const [isPressed, setIsPressed] = useState(false);
    const countRef = useRef(0);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    // Touch handling
    const [isTouching, setIsTouching] = useState(false);
    const touchTimeout = useRef<NodeJS.Timeout | null>(null);

    const removeRipple = (id: number) => {
      setRipples(prev => 
        prev.map(ripple => 
          ripple.id === id
            ? { ...ripple, opacity: 0 }
            : ripple
        )
      );

      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== id));
      }, 200);
    };

    const addRipple = useCallback((event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      let clientX, clientY;

      if ('touches' in event) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else {
        clientX = event.clientX;
        clientY = event.clientY;
      }

      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;
      
      const corners = [
        { x: 0, y: 0 },
        { x: rect.width, y: 0 },
        { x: 0, y: rect.height },
        { x: rect.width, y: rect.height }
      ];
      
      const maxDistance = Math.max(
        ...corners.map(corner => 
          Math.sqrt(
            Math.pow(corner.x - relativeX, 2) + 
            Math.pow(corner.y - relativeY, 2)
          )
        )
      );

      const rippleId = countRef.current;
      countRef.current += 1;

      const newRipple = {
        id: rippleId,
        left: relativeX,
        top: relativeY,
        scale: 0,
        opacity: 0.60,
      };

      setRipples(prev => [...prev, newRipple]);
      setIsPressed(true);

      requestAnimationFrame(() => {
        setRipples(prev =>
          prev.map(ripple =>
            ripple.id === rippleId
              ? { ...ripple, scale: (maxDistance / 5) }
              : ripple
          )
        );
      });

      const duration = 'touches' in event ? 800 : 500;
      setTimeout(() => removeRipple(rippleId), duration);
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isTouching) {
        addRipple(e);
      }
    };

    const handleMouseUp = () => {
      setIsPressed(false);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
      setIsTouching(true);
      setIsPressed(true);
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current);
      }
      addRipple(e);
    };

    const handleTouchEnd = () => {
      setIsPressed(false);
      touchTimeout.current = setTimeout(() => {
        setIsTouching(false);
      }, 100);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
    };

    const getGradient = () => {
      if (variant === 'outline' || variant === 'ghost') {
        return {
          light: 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 70%)',
          dark: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 70%)'
        };
      }
      return {
        light: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0.15) 60%, rgba(255,255,255,0) 70%)',
        dark: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0) 70%)'
      };
    };

    const gradients = getGradient();

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          isPressed && 'shadow-inner scale-[0.98] transition-all duration-100'
        )}
        ref={buttonRef}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        {...props}
      >
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.left,
              top: ripple.top,
              width: '10px',
              height: '10px',
              transform: `translate(-50%, -50%) scale(${ripple.scale})`,
              background: gradients.light,
              opacity: ripple.opacity,
              transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        ))}
        {children}
      </button>
    );
  }
);

CdsButton.displayName = "CdsButton";

export { CdsButton, buttonVariants };