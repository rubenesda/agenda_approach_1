import React, { useState } from 'react';

type LoginProps = {
  switchToCreateAccount: () => void;
  handleLogin: (login: LoginData) => void;
  errorMessage: string;
}

const initialLoginData: LoginData = {
  email: '',
  password: '',
};

export default function Login({ switchToCreateAccount, handleLogin, errorMessage }: LoginProps) {
  const [loginData, setLoginData] = useState(initialLoginData);

  function handleCreateAccount() {
    switchToCreateAccount();
  }

  function handleLoginChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.id === 'email') {
      setLoginData({
        ...loginData,
        email: e.target.value,
      });
    } else {
      setLoginData({
        ...loginData,
        password: e.target.value,
      });
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(loginData);
  }

  return (
    <div className="flex h-[27rem] w-96 flex-col items-start z-10 bg-white rounded-md py-8 px-6">
      <h1 className="text-4xl font-semibold">Welcome!</h1>
      <h2 className="text-lg font-semibold mb-4">Discover a New World.</h2>
      <form className="flex flex-col items-start justify-center w-full mb-4" onSubmit={handleSubmit}>
        <label className="text-sm mb-1.5">Email</label>
        <input id="email" className="h-10 rounded-md border w-full px-3 py-2 mb-4
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          placeholder="xavier@email.com" type="email" onChange={handleLoginChange}/>
        <label className="text-sm mb-1.5">Password</label>
        <input id="password" className="h-10 rounded-md border w-full px-3 py-2 mb-4"  placeholder="****" type="password" onChange={handleLoginChange}/>
        {errorMessage && <span className="text-sm text-red-500 w-full text-center">{errorMessage}</span>}
        <button type="submit" className="rounded-md bg-black text-sm font-medium h-10 w-full text-white">Log In</button>
      </form>
      <label className="mb-1.5 text-base self-center">{"Don't have an account yet?"}</label>
      <button className="text-base self-center" onClick={handleCreateAccount}>Create Account</button>
    </div>
  );
}