'use client'

import { useEffect, useState } from 'react';
import { useApp } from '@/models/contexts/AppContext';
import { validateEmail, validatePassword } from '@/models/utils/regex';
import { userService } from '@/service/UserService';
import Button from '@/src/components/Atoms/Button';
import Image from '@/src/components/Atoms/Image';
import Notifications from '@/src/components/Atoms/Notifications';
import { Paragraph } from '@/src/components/Atoms/Paragraph';
import { Title } from '@/src/components/Atoms/Title';
import InputContent from '@/src/components/Molecules/InputContent';
import ContainerPublic from '@/src/components/Organisms/ContainerPublic';
import router from 'next/router';

export default function Login() {
    //Estados do contexto
    const { setUserId, alertContext, handleAlert } = useApp();

    //Estados para carregar 
    const [loading, setLoading] = useState(false);

    //Estados que habilita/desabilita botão com base na validação
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    //Estados e validações do e-mail
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const handleEmailChange = (e: any) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        setIsValidEmail(validateEmail(inputEmail));
    };

    //Estados e validações das senhas
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);
    const handlePasswordChange = (e: any) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
        setIsValidPassword(validatePassword(inputPassword));
    };

    //Função que valida email e senha
    async function handleLogin() {
        setLoading(true);
        try {
            const userId = await userService.login({ email, mainPassword: password });
            if (userId) {
                if (setUserId) {
                    setUserId(userId);
                    localStorage.setItem('userId', userId);
                }
                handleAlert({
                    title: "Login realizado com sucesso.",
                    message: "Bem-vindo!",
                    type: "success"
                });
                setTimeout(() => {
                    router.push('/dashboard');
                }, 3000);
            }
        } catch (error: any) {
            handleAlert({
                title: "Login Inválido!",
                message: `${error.message}`,
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // Verifica se algum dos campos está vazio ou se algum dos estados de validação é falso
        if (
            !email ||
            !password ||
            !isValidEmail ||
            !isValidPassword
        ) {
            setIsButtonDisabled(true); // Se algum for verdadeiro, desabilita o botão
        } else {
            setIsButtonDisabled(false); // Se todos estiverem preenchidos e válidos, habilita o botão
        }
    }, [email, password, isValidEmail, isValidPassword]);

    return (
        <>
            <ContainerPublic>
                <Notifications
                    title={alertContext.title}
                    message={alertContext.message}
                    typeAlert={alertContext.type}
                    show={alertContext.show}
                />
                <div className="min-h-full flex-1 flex-col px-6 lg:px-8">
                    <Image
                        className="mx-auto h-20 sm:h-24 w-auto"
                        src="https://b2clubstorage.blob.core.windows.net/shared/images/logo/nivello-removebg.png"
                        alt='logo_nivello'
                    />
                    <Title className='mt-6' size='xxxl' variant='h1' weight='semibold' color='dark'>{"Bem-Vindo ao Challenge Nivello"}</Title>
                    <Paragraph color='normal' size='xLarge'>{"Faça seu login para prosseguir"}</Paragraph>
                    <div className=" sm:mx-auto sm:w-full lg:max-w-[580px] shadow-xl">
                        <div className="bg-white px-6 py-12 rounded-lg">
                            <form className="" action="#" method="POST">
                                <InputContent.Root>
                                    <InputContent.Label>{"E-mail"}</InputContent.Label>
                                    <InputContent.Input
                                        inputType="text"
                                        htmlForLink='email'
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    {!isValidEmail && <InputContent.Validation message='Email Inválido' validationType='error' />}

                                </InputContent.Root>
                                <InputContent.Root>
                                    <InputContent.Label>{"Senha"}</InputContent.Label>
                                    <InputContent.Input
                                        maxLength={6}
                                        inputType='password'
                                        htmlForLink='password'
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    {!isValidPassword && <InputContent.Validation message='A senha deve conter apenas números e ter no máximo 6 caracteres.' validationType='error' />}
                                </InputContent.Root>
                                <Button
                                    disabled={isButtonDisabled}
                                    colors={isButtonDisabled ? "disabled" : "primary"}
                                    loading={loading}
                                    className='mt-8'
                                    size='md'
                                    type='submit'
                                    onClick={handleLogin}
                                    font='semibold'
                                >
                                    {"Login"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </ContainerPublic>
        </>
    );
}
