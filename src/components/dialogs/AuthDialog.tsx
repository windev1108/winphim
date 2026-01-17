import React, { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { RegisterFormData, registerSchema, SignInFormData, signInSchema } from '@/validators/auth.schema';
import { useMutation } from '@tanstack/react-query';
import { loginRequest, registerRequest } from '@/api/auth';
import { useAuth, useDisclosure } from '@/hooks';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { getMutateError } from '@/lib/utils';
import { Icons } from '@/assets/icons';
import { openGoogleLoginPopup } from '@/lib/auth';


interface IAuthDialogProps {
  children: ReactNode
}



const AuthDialog = ({ children }: IAuthDialogProps) => {
  const [opened, { toggle, close }] = useDisclosure(false)
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuth()
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutateAsync: registerMutate, isPending: isLoadingRegister } = useMutation({
    mutationFn: registerRequest,
  })

  const { mutateAsync: loginMutate, isPending: isLoadingLogin } = useMutation({
    mutationFn: loginRequest,
  })

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleClear = () => {
    signInForm.reset()
    registerForm.reset()
    setMode('signin')
    close()
  }

  const onToggle = () => {
    toggle()
    if (opened) {
      setTimeout(() => handleClear(), 100)
    }
  }

  const handleLoginWithGoogle = async () => {
    try {
      await openGoogleLoginPopup();
      handleClear()
      toast.success("Đăng nhập thành công!")
    } catch (error) {
      console.log('error ', error)
    }
  };



  const onSignInSubmit = async (data: SignInFormData) => {
    try {
      const { user, sessionId } = await loginMutate(data)
      if (sessionId && user) {
        setAuth(sessionId, user)
      }
      console.log({ user, sessionId })
      toast.success('Đăng nhập thành công!')
      handleClear()
    } catch (error) {
      getMutateError(error)
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      const { sessionId, user } = await registerMutate(data)
      setAuth(sessionId, user)
      toast.success('Đăng ký thành công!')
      handleClear()
    } catch (error) {
      getMutateError(error)
    }
  };

  const PROVIDER_LIST = [
    {
      label: 'Đăng nhập bằng Google',
      icon: <Icons.google />,
      execute: handleLoginWithGoogle
    }
  ]

  return (
    <Dialog open={opened} onOpenChange={onToggle}>
      <div onClick={() => toggle()}>
        {children}
      </div>
      <DialogContent className="xl:min-w-[500px] min-w-[95vw] p-0 xl:rounded-xl overflow-hidden border-0">
        <DialogTitle className='sr-only'></DialogTitle>
        <div className="bg-zinc-900 p-8 sm:p-12">
          {mode === 'signin' ? (
            // Sign In Form
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Chào Mừng Trở Lại</h2>
                <p className="text-zinc-400 text-sm">Đăng nhập để tiếp tục phiêu lưu của bạn.</p>
              </div>

              <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4">
                {/* Email or Username */}
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      {...signInForm.register('email')}
                      type="text"
                      placeholder="Email"
                      className="w-full bg-zinc-800 text-white pl-10 pr-4 py-3 rounded-lg border border-zinc-700 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition"
                    />
                  </div>
                  {signInForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{signInForm.formState.errors.email?.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      {...signInForm.register('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mật khẩu"
                      className="w-full bg-zinc-800 text-white pl-10 pr-12 py-3 rounded-lg border border-zinc-700 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {signInForm.formState.errors.password && (
                    <p className="text-red-500 text-xs mt-1">{signInForm.formState.errors.password.message}</p>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <button type="button" className="text-yellow-500 text-sm hover:underline">
                    Quên mật khẩu?
                  </button>
                </div>

                {/* Submit Button */}
                <Button
                  loading={isLoadingLogin}
                  disabled={isLoadingLogin}
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition"
                >
                  Đăng nhập
                </Button>
                {PROVIDER_LIST.map((x) => (
                  <Button key={x.label} type='button' onClick={() => x.execute()} className='w-full' variant={'secondary'}>
                    {x.icon}
                    {x.label}
                  </Button>
                ))}

                {/* Switch to Register */}
                <p className="text-center text-zinc-400 text-sm mt-4">
                  Chưa có tài khoản?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      signInForm.reset();
                    }}
                    className="text-yellow-500 hover:underline font-medium"
                  >
                    Đăng ký
                  </button>
                </p>
              </form>
            </div>
          ) : (
            // Register Form
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Tạo Tài Khoản</h2>
                <p className="text-zinc-400 text-sm">Tham gia với chúng tôi và bắt đầu xem phim.</p>
              </div>

              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                {/* First Name */}
                <div>
                  <input
                    {...registerForm.register('firstName')}
                    type="text"
                    placeholder="Nhập tên của bạn"
                    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition"
                  />
                  {registerForm.formState.errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{registerForm.formState.errors.firstName.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <input
                    {...registerForm.register('lastName')}
                    type="text"
                    placeholder="Nhập họ của bạn"
                    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition"
                  />
                  {registerForm.formState.errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{registerForm.formState.errors.lastName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    {...registerForm.register('email')}
                    type="email"
                    placeholder="Nhập email của bạn"
                    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition"
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{registerForm.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="relative">
                    <input
                      {...registerForm.register('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Nhập mật khẩu của bạn"
                      className="w-full bg-zinc-800 text-white px-4 pr-12 py-3 rounded-lg border border-zinc-700 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {registerForm.formState.errors.password && (
                    <p className="text-red-500 text-xs mt-1">{registerForm.formState.errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <div className="relative">
                    <input
                      {...registerForm.register('confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Xác nhận mật khẩu của bạn"
                      className="w-full bg-zinc-800 text-white px-4 pr-12 py-3 rounded-lg border border-zinc-700 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Terms */}
                <p className="text-zinc-400 text-xs">
                  Tôi đồng ý với{' '}
                  <a href="#" className="text-yellow-500 hover:underline">
                    Điều khoản Dịch vụ
                  </a>{' '}
                  và{' '}
                  <a href="#" className="text-yellow-500 hover:underline">
                    Chính sách Bảo mật
                  </a>
                  .
                </p>

                {/* Submit Button */}
                <Button
                  className='w-full'
                  type="submit"
                >
                  Đăng ký
                </Button>

                {/* Switch to Sign In */}
                <p className="text-center text-zinc-400 text-sm mt-4">
                  Đã có tài khoản?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      registerForm.reset();
                    }}
                    className="text-yellow-500 hover:underline font-medium"
                  >
                    Đăng nhập
                  </button>
                </p>
              </form>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;