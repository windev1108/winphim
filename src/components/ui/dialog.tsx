
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

const DialogContext = React.createContext<{
    open: boolean
}>({ open: false })

function Dialog({
    open: controlledOpen,
    onOpenChange,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)

    // Use controlled state if provided, otherwise use internal state
    const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
    const setOpen = onOpenChange || setUncontrolledOpen

    return (
        <DialogContext.Provider value={{ open }}>
            <DialogPrimitive.Root
                data-slot="dialog"
                open={open}
                onOpenChange={setOpen}
                {...props}
            />
        </DialogContext.Provider>
    )
}

function DialogTrigger({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
    return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
    return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
    return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
    return (
        <DialogPrimitive.Overlay
            asChild
            {...props}
        >
            <motion.div
                data-slot="dialog-overlay"
                className={cn(
                    "fixed inset-0 z-50 bg-black/50",
                    className
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
            />
        </DialogPrimitive.Overlay>
    )
}

function DialogContent({
    className,
    children,
    showCloseButton = true,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean
}) {
    const { open } = React.useContext(DialogContext)

    return (
        <AnimatePresence>
            {open && (
                <DialogPortal forceMount>
                    <DialogOverlay />
                    <DialogPrimitive.Content
                        asChild
                        forceMount
                        {...props}
                    >
                        <motion.div
                            data-slot="dialog-content"
                            className={cn(
                                "bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border p-6 shadow-lg sm:max-w-lg",
                                className
                            )}
                            style={{
                                translateX: "-50%",
                                translateY: "-50%",
                            }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{
                                duration: 0.2,
                                ease: [0.4, 0.0, 0.2, 1]
                            }}
                        >
                            {children}
                            {showCloseButton && (
                                <DialogPrimitive.Close
                                    data-slot="dialog-close"
                                    className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                                >
                                    <X />
                                    <span className="sr-only">Close</span>
                                </DialogPrimitive.Close>
                            )}
                        </motion.div>
                    </DialogPrimitive.Content>
                </DialogPortal>
            )}
        </AnimatePresence>
    )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="dialog-header"
            className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
            {...props}
        />
    )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="dialog-footer"
            className={cn(
                "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
                className
            )}
            {...props}
        />
    )
}

function DialogTitle({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
    return (
        <DialogPrimitive.Title
            data-slot="dialog-title"
            className={cn("text-lg leading-none font-semibold", className)}
            {...props}
        />
    )
}

function DialogDescription({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
    return (
        <DialogPrimitive.Description
            data-slot="dialog-description"
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    )
}

export {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
}