
'use client';
import AuthDialog from '../dialogs/AuthDialog'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button'
import { useAuth } from '@/hooks'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useMutation } from '@tanstack/react-query';
import { logoutRequest } from '@/api/auth';
import { getMutateError } from '@/lib/utils';
import toast from 'react-hot-toast';
import { Bell, FolderHeart, List, Loader2, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { useProfileQuery } from '@/api/auth/queries';

const AuthSection = () => {
  const { isLogged, user, logout: logoutStore, token } = useAuth()
  const { mutateAsync: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutRequest
  })
  const router = useRouter()
  useProfileQuery({ enabled: !!token })
  const handleLogout = async () => {
    try {
      const { message } = await logout()
      toast.success(message)
      logoutStore()
    } catch (error) {
      getMutateError(error)
    }
  }
  return (
    <div>
      {isLogged ?
        <div className="flex items-center gap-3">
          <Button variant={'secondary'} size={'icon'}>
            <Bell fill='currentColor' />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className='rounded-full bg-secondary-800 flex items-center gap-2 size-9 cursor-pointer'>
                <Avatar className='bg-primary w-full h-full'>
                  <AvatarImage src={user?.avatar} alt={user?.firstName} />
                  <AvatarFallback className='text-secondary-800'>{`${user?.firstName?.charAt(0).toUpperCase()}${user?.lastName?.charAt(1)}`}</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => router.replace(ROUTES.MY_MOVIE)} className='cursor-pointer py-2 px-4'>
                <FolderHeart />
                Danh sách yêu thích
              </DropdownMenuItem>
              <DropdownMenuItem disabled={isLoading} onClick={handleLogout} className='cursor-pointer py-2 px-4'>
                <LogOut />
                Đăng xuất  {isLoading && <Loader2 />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        :
        <AuthDialog>
          <Button className="xl:min-w-[146px] min-w-[113px] rounded-full">{'Đăng nhập'}</Button>
        </AuthDialog>
      }
    </div>
  )
}

export default AuthSection