import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import SearchInput from '../common/SearchInput'
import { useSearchMovieListQuery } from '@/api/movie'
import useDebounce from '@/hooks/useDebounce'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import MovieCardRow from '../common/MovieCardRow'
import useClickOutside from '@/hooks/useClickOutside'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/routes'


interface ISearchProps {
    onClose?: () => void
}

const Search = forwardRef<HTMLElement, ISearchProps>(({ onClose }, _ref) => {
    const [open, setOpen] = useState(false)
    const [keyword, setKeyword] = useState('')
    const debounceKeyword = useDebounce(keyword, 300)
    const router = useRouter()
    const triggerRef = useRef<any>(null)
    const contentRef = useRef<any>(null)

    const { data } = useSearchMovieListQuery({
        params: { keyword: debounceKeyword },
        options: { enabled: !!debounceKeyword }
    })

    // Close when clicking outside
    useClickOutside([triggerRef, contentRef], () => {
        setOpen(false)
    })

    // When clicking input → open popover
    const handleClickInput = () => {
        if (data?.items?.length! > 0) {
            setOpen(true)
        }
    }

    const handleClear = (isClose?: boolean) => {
        setKeyword('')
        setOpen(false)
        if (isClose) {
            onClose?.()
        }
    }

    const handleSearch = () => {
        handleClear()
        router.replace(`${ROUTES.SEARCH}?keyword=${keyword}`)
    }

    // Auto open/close based on search results
    useEffect(() => {
        if (debounceKeyword && data?.items?.length! > 0) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [debounceKeyword, data])

    return (
        <Popover open={open} onOpenChange={() => { }}>
            <PopoverTrigger asChild>
                <div
                    ref={triggerRef}
                    onClick={handleClickInput}   // ⭐ click input → open
                >
                    <SearchInput
                        inputBaseClassName="md:bg-secondary-800/80 bg-secondary-800"
                        containerClassName="w-full max-w-[8.8rem] lg:max-w-[30rem]"
                        value={keyword}
                        onChangeValue={setKeyword}
                        onClearValue={() => handleClear()}
                        onSearch={handleSearch}
                    />
                </div>
            </PopoverTrigger>

            {open && (
                <PopoverContent
                    ref={contentRef}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onWheel={(e) => e.stopPropagation()}
                    className="p-1 w-full max-w-[16rem] bg-secondary-800 max-h-120 overflow-y-auto"
                    sideOffset={10}
                    align="start"
                >
                    {data?.items?.map((item) => (
                        <div key={item._id} onClick={() => handleClear(true)}>
                            <MovieCardRow movie={item} size="sm" />
                        </div>
                    ))}
                </PopoverContent>
            )}
        </Popover>
    )
})

export default Search
