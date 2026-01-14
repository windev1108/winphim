import React from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface TooltipWrapperProps {
    children: React.ReactNode;
    content: React.ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    delayDuration?: number;
    sideOffset?: number;
    disabled?: boolean;
    className?: string;
    contentClassName?: string;
    asChild?: boolean;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
    children,
    content,
    side = 'top',
    align = 'center',
    delayDuration = 200,
    sideOffset = 4,
    disabled = false,
    className,
    contentClassName,
    asChild = true,
}) => {
    // Nếu disabled hoặc không có content, chỉ render children
    if (disabled || !content) {
        return <>{children}</>;
    }

    return (
        <Tooltip delayDuration={delayDuration}>
            <TooltipTrigger asChild={asChild} className={className}>
                {children}
            </TooltipTrigger>
            <TooltipContent
                side={side}
                align={align}
                sideOffset={sideOffset}
                className={cn(contentClassName)}
            >
                {content}
            </TooltipContent>
        </Tooltip>
    );
};

export default TooltipWrapper;