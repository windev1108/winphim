import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().email('Email không hợp lệ').min(1, 'Email là bắt buộc'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export const registerSchema = z.object({
    name: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(6, 'Xác nhận mật khẩu là bắt buộc'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;