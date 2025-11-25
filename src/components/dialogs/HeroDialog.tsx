import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'

const HeroDialog = ({ children }: { children: React.ReactNode }) => {
    const t = useTranslations()
    return (
        <Dialog>
            <DialogTitle></DialogTitle>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className='border-secondary-800 p-0 w-[350px] h-[404px] shadow-md bg-transparent '>
                <div className='absolute -bottom-4 inset-x-0 z-20 flex items-center justify-center'>
                    <Button className='xl:min-w-[147px] min-w-[113px uppercase'>{t('see_more')}</Button>
                </div>
                <div className='relative rounded-2xl overflow-hidden'>
                    <div className="absolute inset-x-0 top-10 text-center flex flex-col items-center z-20">
                        <span className='text-2xl font-bold bg-linear-to-r from-white via-[#FFD3E3] to-[#FFEA9F] bg-clip-text text-transparent'>XIAOMI TV max Series</span>
                        <span className='text-base'>{t('view_to_the_max')}</span>

                    </div>
                    <picture className='z-10'>
                        <Image
                            alt='hero'
                            fill
                            priority
                            quality={90}
                            src="/images/hero-mb.png"
                            className="object-cover"
                        />
                    </picture>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default HeroDialog