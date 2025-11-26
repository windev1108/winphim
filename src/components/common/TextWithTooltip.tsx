"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn, removeHtml } from "@/lib/utils"

type TextWithTooltipProps = {
    children?: string
    html?: string
    maxLength?: number
    className?: string
    tooltipClassName?: string
    side?: "top" | "bottom" | "left" | "right"
    delay?: number
}

export default function TextWithTooltip({
    children,
    html,
    maxLength = 20,
    className,
    tooltipClassName,
    side = "top",
    delay = 200,
}: TextWithTooltipProps) {
    const raw = html ? removeHtml(html) : children ?? ""
    const isOverflow = raw.length > maxLength
    const shortText = isOverflow ? raw.slice(0, maxLength) + "..." : raw

    // Case 1 — Không vượt quá → không cần tooltip
    if (!isOverflow) {
        return html ? (
            <span
                className={cn("wrap-break-word whitespace-normal", className)}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        ) : (
            <span className={cn("wrap-break-word whitespace-normal", className)}>
                {children}
            </span>
        )
    }

    // Case 2 — Có overflow → dùng tooltip
    return (
        <TooltipProvider delayDuration={delay}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span
                        className={cn(
                            "wrap-break-word whitespace-normal cursor-help inline-block",
                            className
                        )}
                        {...(html
                            ? { dangerouslySetInnerHTML: { __html: shortText } }
                            : {})}
                    >
                        {!html ? shortText : null}
                    </span>
                </TooltipTrigger>

                <TooltipContent
                    side={side}
                    className={cn("max-w-[320px] wrap-break-word whitespace-normal", tooltipClassName)}
                >
                    {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : raw}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}