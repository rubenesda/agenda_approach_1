import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Signup from '~/components/signup';
import Login from '~/components/login';
import { useRouter } from 'next/navigation';

export default function Welcome() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [errorLogin, setErrorLoing] = useState('');
  const [errorSignup, setErrorSignup] = useState('');

  async function handleLogin(login: LoginData) {
    const response = await signIn('credentials', {
      ...login,
      redirect: false,
    });
    if (!response?.ok) {
      return setErrorLoing('There was an error with your credentials')
    }
    return router.push('/schedule');
  }

  async function handleSignUp(account: AccountData) {
    const response = await fetch('/api/account', {
      body: JSON.stringify(account),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const body  = await response.json() as APIResponse;
      return setErrorSignup(body.message);
    }
    setIsLogin(true);
  }

  function handleSwitchToLogin() {
    setIsLogin(true);
    setErrorSignup('');
  }

  function handleSwitchToSignup() {
    setIsLogin(false);
    setErrorLoing('');
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Image className={"fixed z-0 h-screen w-full"} loading='lazy' src={'/images/background.jpeg'} alt="background" width={2880} height={1920}/>
      {isLogin &&
        <Login
          switchToCreateAccount={handleSwitchToSignup}
          handleLogin={handleLogin}
          errorMessage={errorLogin}
        />
      }
      {!isLogin &&
        <Signup
          switchToLogin={handleSwitchToLogin}
          handleSignUp={handleSignUp}
          errorMessage={errorSignup}
        />
      }
    </div>
  );
}