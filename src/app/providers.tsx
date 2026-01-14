'use client';
import MainLayout from '@/components/Layout/MainLayout'
import Preloader from '@/components/motion/preload'
import { ReactNode } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';

const Providers = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <ReactQueryDevtools />
            <Preloader>
                <MainLayout>
                    {children}
                </MainLayout>
            </Preloader>
        </QueryClientProvider>
    )
}

export default Providers