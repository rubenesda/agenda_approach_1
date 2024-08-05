import React, { useState } from 'react';

type CreateAccountProps = {
  switchToLogin: () => void;
  handleSignUp: (account: AccountData) => void;
  errorMessage: string;
}

const initialNewAccountData: AccountData = {
  name: '',
  lastName: '',
  email: '',
  password: '',
};

export default function Signup({ switchToLogin, handleSignUp, errorMessage }: CreateAccountProps) {
  const [newAccountData, setNewAccountData] = useState(initialNewAccountData);

  function handleSwitchToLogin() {
    switchToLogin();
  }

  function handleNewAccountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const identifier = e.target.id;
    if (identifier === 'name') {
      setNewAccountData({
        ...newAccountData,
        name: e.target.value,
      });
    } else if (identifier === 'lastname') {
      setNewAccountData({
        ...newAccountData,
        lastName: e.target.value,
      });
    } else if (identifier === 'email') {
      setNewAccountData({
        ...newAccountData,
        email: e.target.value,
      });
    } else {
      setNewAccountData({
        ...newAccountData,
        password: e.target.value,
      });
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSignUp(newAccountData);
  }

  return (
    <div className="flex h-[33rem] w-96 flex-col items-start z-10 bg-white rounded-md py-8 px-6">
      <h1 className="text-4xl font-semibold mb-4">New Account</h1>
      <form className="flex flex-col items-start justify-center w-full mb-4" onSubmit={handleSubmit}>
        <div className="flex w-full justify-between">
          <div className="flex flex-col items-start">
            <label className="text-sm mb-1.5">Name</label>
            <input type="text" id="name" className="h-10 rounded-md border w-[9.5rem] px-3 py-2 mb-4
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              placeholder="Xavier" pattern="[a-zA-Z]*" title="Only letters, no digits" onChange={handleNewAccountChange}
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-sm mb-1.5">Last Name</label>
            <input type="text" id="lastname" className="h-10 rounded-md border w-[9.5rem] px-3 py-2 mb-4
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              placeholder="Smith" pattern="[a-zA-Z]*"  title="Only letters, no digits" onChange={handleNewAccountChange}
            />
          </div>
        </div>
        <label className="text-sm mb-1.5">Email</label>
        <input id="email" className="h-10 rounded-md border w-full px-3 py-2 mb-4
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          placeholder="xavier@email.com" title="Only valid emails" type="email" onChange={handleNewAccountChange}
          />
        <label className="text-sm mb-1.5">Password</label>
        <input id="password" className="h-10 rounded-md border w-full px-3 py-2 mb-4"  placeholder="****" type="password" onChange={handleNewAccountChange}/>
        <label className="text-sm mb-1.5">Confirm Password</label>
        <input id="confirm" className="h-10 rounded-md border w-full px-3 py-2 mb-4"  placeholder="****" type="password"/>
        {errorMessage && <span className="text-sm text-red-500 w-full text-center">{errorMessage}</span>}
        <button type="submit" className="rounded-md bg-black text-sm font-medium h-10 w-full text-white">Create Account</button>
      </form>
      <button className="text-base self-center" onClick={handleSwitchToLogin}>Log In</button>
    </div>
  );
}