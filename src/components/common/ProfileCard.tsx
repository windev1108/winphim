import { getTMDBImageUrl } from '@/lib/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Image from 'next/image'

interface ProfileCardProps {
    profileUrl: string
    name: string
    description: string
}

const ProfileCard = ({ profileUrl, name, description }: ProfileCardProps) => {
    return (
        <div className='flex flex-col gap-4 items-center justify-center'>
            <Avatar className='w-40 h-40 bg-secondary-800'>
                <AvatarImage src={getTMDBImageUrl(profileUrl)} />
                <AvatarFallback className='text-xl'>
                    <Image width={160} height={160} src={'/images/avatar-default.png'} alt='avt' />
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2 items-center">
                <h1 className='text-base font-semibold max-w-40 text-center'>{name}</h1>
                <h3 className='text-sm text-secondary-300'>{description}</h3>
            </div>
        </div>
    )
}

export default ProfileCard