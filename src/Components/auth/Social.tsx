import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@nextui-org/react';

export const Social = () => {
    const handleGoogleSignIn = async () => {
        // Lógica de signIn con Google
        try {
            // Simulación de la redirección después de iniciar sesión con Google
            const callbackUrl = "http://juanpagod.com/user/PrincipalPage";
            window.location.href = callbackUrl;
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
        }
    };

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full bg-transparent border-2"
                onClick={handleGoogleSignIn}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
        </div>
    );
};
