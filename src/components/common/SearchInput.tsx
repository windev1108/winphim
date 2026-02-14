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
    onSearch?: () => void
}

const SearchInput = forwardRef<HTMLDivElement, ISearchInputProps>(({ inputBaseClassName, containerClassName, inputProps, placeholder = "Tìm kiếm phim", value, onChangeValue, onClearValue, onSearch, ...props }, ref) => {
    return (
        <div className={cn("relative w-full", containerClassName)} ref={ref} {...props}>
            <Search onClick={() => onSearch?.()} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 hover:text-primary text-secondary-200 cursor-pointer" />
            <Input
                {...inputProps}
                type="text"
                onKeyDown={(e) => e.key === 'Enter' ? onSearch?.() : null}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChangeValue(e.target.value)}
                className={cn("w-full pl-10 lg:pr-6 pr-4 h-10 bg-zinc-900 border-secondary-800 text-white placeholder:text-secondary-200 primary focus:ring-1 focus:ring-transparent transition-all rounded-lg lg:text-base text-xs lg:placeholder:text-base placeholder:text-xs", inputBaseClassName)}
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