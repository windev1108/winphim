import { IUser } from '@/api/auth';
import { env } from '@/config/env';
import { useAuthStore } from '@/store';

export const openGoogleLoginPopup = (): Promise<{
    user: IUser;
    sessionId: string;
}> =>
    new Promise((resolve, reject) => {
        const width = 500;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const origin = window.location.origin;

        const popup = window.open(
            `${env.NEXT_PUBLIC_API_URL}/auth/google?origin=${encodeURIComponent(origin)}`,
            'GoogleLogin',
            `width=${width},height=${height},top=${top},left=${left},menubar=no,toolbar=no,location=no,status=no`
        );

        if (!popup) {
            return reject(new Error('Popup was blocked. Please allow popups for this site.'));
        }

        let isResolved = false;

        const handler = (event: MessageEvent) => {
            if (event.data.type === 'google-auth-success') {
                console.log('✅ Google authentication successful!');
                isResolved = true;
                // Cleanup
                window.removeEventListener('message', handler);
                clearTimeout(timeout);
                const { token, user } = event.data;
                useAuthStore.getState().setAuth(token, user);

                // Đóng popup (nếu có thể)
                try {
                    popup?.close();
                } catch (e) {
                    console.log('ℹ️ Could not close popup (COOP policy), it will auto-close');
                }
                resolve(event.data);
            } else if (event.data.type === 'google-auth-error') {
                console.error('❌ Google authentication failed:', event.data.error);
                isResolved = true;

                window.removeEventListener('message', handler);
                clearTimeout(timeout);

                try {
                    popup?.close();
                } catch (e) {
                    // Ignore
                }

                reject(new Error(event.data.error || 'Authentication failed'));
            }
        };

        // Timeout sau 3 phút (đủ thời gian cho user login)
        const timeout = setTimeout(() => {
            if (!isResolved) {
                console.warn('⏰ Google login timeout');
                window.removeEventListener('message', handler);

                try {
                    popup?.close();
                } catch (e) {
                    // Ignore COOP error
                }

                reject(new Error('Login timeout. Please try again.'));
            }
        }, 180000); // 3 phút

        // Lắng nghe postMessage từ popup
        window.addEventListener('message', handler);

        // ❌ KHÔNG dùng setInterval để check popup.closed vì bị COOP chặn
        // Thay vào đó, dựa vào postMessage hoặc timeout
    });