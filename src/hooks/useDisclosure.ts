import { useState } from "react"

export const useDisclosure = (initialValue: boolean = false) : [boolean, { open: () => void, close: () => void , toggle: () => void }] =>  {
    const [ opened , setOpen ] = useState(initialValue)
    return [opened, { open : () => setOpen(true), close: () => setOpen(false) , toggle: () => setOpen((prev) => !prev) }]
}
