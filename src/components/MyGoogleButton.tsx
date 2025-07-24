// LoginGoogleButton.tsx
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'antd'; // hoặc tự styled button theo ý bạn
import { getGoogleUser, loginGoogle } from '../services/auth';
import { GrGoogle } from 'react-icons/gr';
import { useAuth } from '../context/AuthProvider';

const LoginGoogleButton = ({ onSuccess, onError }: { onSuccess: () => void, onError: (error: string) => void }) => {
    const { login: authLogin } = useAuth();
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const accessToken = tokenResponse.access_token;
            const profile = await getGoogleUser(accessToken)
            const data = await loginGoogle({ email: profile.email, avatarUrl: profile.picture, name: profile.name })
            authLogin(data.user, data.accessToken)
            onSuccess()
        },
        onError: (error) => {
            onError(error.error_description as string)
        },
        flow: 'implicit', // hoặc 'auth-code' nếu bạn dùng server-side flow
    });

    return (
        <Button
            onClick={() => login()}
            className="text-[14px] p-[20px] w-[300px] font-medium rounded-xl" >
            <GrGoogle size={18} /> Google
        </Button>
    );
};

export default LoginGoogleButton;
