import { Search, X } from 'lucide-react'
import { Input } from '../ui/input'
import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ISearchInputProps extends HTMLAttributes<HTMLDivElement> {
    placeholder?: string
    value: string
    inputProps?: HTMLAttributes<HTMLInputElement>
    containerClassName?: string
    inputBaseClassName?: string
    onChangeValue: (val: string) => void
    onClearValue?: () => void
}

const SearchInput = forwardRef<HTMLDivElement, ISearchInputProps>(({ inputBaseClassName, containerClassName, inputProps, placeholder = "Tìm kiếm phim, diễn viên, đạo diễn...", value, onChangeValue, onClearValue, ...props }, ref) => {
    return (
        <div className={cn("relative w-full", containerClassName)} ref={ref} {...props}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
            <Input
                {...inputProps}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChangeValue(e.target.value)}
                className={cn("w-full pl-10 pr-10 h-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 primary focus:ring-1 focus:ring-transparent transition-all rounded-lg text-base", inputBaseClassName)}
            />
            {value && (
                <button
                    onClick={() => onClearValue?.()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-800 rounded-full transition-colors"
                    aria-label="Xóa tìm kiếm"
                >
                    <X className="w-4 h-4 text-zinc-400 hover:text-white" />
                </button>
            )}
        </div>
    )
})

export default SearchInput