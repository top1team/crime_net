"use client";
import React, { useState, useEffect } from 'react';
import UserIcon from './icons/UserIcon';
import EmailIcon from './icons/EmailIcon';
import LockIcon from './icons/LockIcon';
import FacebookIcon from './icons/FacebookIcon';
import TwitterIcon from './icons/TwitterIcon';

interface AuthFormProps {
  initialState: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ initialState }) => {
  const [isSignUp, setIsSignUp] = useState(initialState === 'signup');

  useEffect(() => {
    setIsSignUp(initialState === 'signup');
  }, [initialState]);

  const GhostButton: React.FC<{ onClick: () => void; children: React.ReactNode, className?: string }> = ({ onClick, children, className }) => (
    <button
      onClick={onClick}
      className={`bg-transparent border-2 border-white text-white font-bold py-2 px-10 rounded-full uppercase tracking-wider transition-transform transform hover:scale-105 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );

  const Form: React.FC<{ title: string; buttonText: string; children: React.ReactNode }> = ({ title, buttonText, children }) => (
    <div className="bg-white dark:bg-stone-800 flex flex-col items-center justify-center h-full px-12 text-center">
      <h1 className="text-3xl font-bold text-black dark:text-stone-200 mb-4">{title}</h1>
      <div className="flex my-4">
        <a href="#" className="social-link"><FacebookIcon className="h-6 w-6" /></a>
        <a href="#" className="social-link"><TwitterIcon className="h-6 w-6" /></a>
      </div>
      {children}
      <button className="bg-red-600 text-white font-bold py-3 px-12 rounded-full uppercase tracking-wider transition-transform transform hover:scale-105 focus:outline-none mt-4">
        {buttonText}
      </button>
    </div>
  );

  const InputField: React.FC<{ type: string; placeholder: string; icon: React.ReactNode }> = ({ type, placeholder, icon }) => (
    <div className="relative w-full my-2">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-stone-500">
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-gray-100 dark:bg-stone-700 border border-gray-200 dark:border-stone-600 w-full p-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-black dark:text-stone-200 placeholder-gray-500 dark:placeholder-stone-400"
      />
    </div>
  );
  
  return (
    <div className={`relative bg-white dark:bg-stone-800 rounded-2xl shadow-2xl w-full max-w-4xl min-h-[600px] overflow-hidden`}>
      {/* Form Containers */}
      <div className={`form-container sign-up-container ${isSignUp ? 'translate-x-full opacity-100 z-5' : 'opacity-0 z-1'}`}>
        <Form title="Create Account" buttonText="Sign Up">
          <span className="text-sm text-gray-500 dark:text-stone-400 mb-4">or use your email for registration</span>
          <InputField type="text" placeholder="Name" icon={<UserIcon className="h-5 w-5" />} />
          <InputField type="email" placeholder="Email" icon={<EmailIcon className="h-5 w-5" />} />
          <InputField type="password" placeholder="Password" icon={<LockIcon className="h-5 w-5" />} />
        </Form>
      </div>
      <div className={`form-container sign-in-container ${isSignUp ? '-translate-x-full opacity-0' : 'opacity-100 z-2'}`}>
        <Form title="Sign In" buttonText="Sign In">
          <span className="text-sm text-gray-500 dark:text-stone-400 mb-4">or use your account</span>
          <InputField type="email" placeholder="Email" icon={<EmailIcon className="h-5 w-5" />} />
          <InputField type="password" placeholder="Password" icon={<LockIcon className="h-5 w-5" />} />
          <a href="#" className="text-sm text-gray-500 dark:text-stone-400 my-4 hover:underline">Forgot your password?</a>
        </Form>
      </div>
      
      {/* Overlay Container */}
      <div className={`overlay-container ${isSignUp ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className={`overlay ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}>
          <div className={`overlay-panel overlay-left ${isSignUp ? 'translate-x-0' : '-translate-x-1/5'}`}>
            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-sm font-light leading-snug mb-6">To keep connected with us please login with your personal info</p>
            <GhostButton onClick={() => setIsSignUp(false)}>Sign In</GhostButton>
          </div>
          <div className={`overlay-panel overlay-right ${isSignUp ? 'translate-x-1/5' : 'translate-x-0'}`}>
            {isSignUp ? (
              <>
                <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
                <p className="text-sm font-light leading-snug mb-6">To keep connected with us please login with your personal info</p>
                <GhostButton onClick={() => setIsSignUp(false)}>Sign In</GhostButton>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
                <p className="text-sm font-light leading-snug mb-6">Enter your personal details and start your journey with us</p>
                <GhostButton onClick={() => setIsSignUp(true)}>Sign Up</GhostButton>
              </>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        .form-container {
            position: absolute;
            top: 0;
            height: 100%;
            transition: all 0.6s ease-in-out;
        }
        .sign-in-container { left: 0; width: 50%; z-index: 2; }
        .sign-up-container { left: 0; width: 50%; }
        
        .overlay-container {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            overflow: hidden;
            transition: transform 0.6s ease-in-out;
            z-index: 100;
        }
        .overlay {
            background: linear-gradient(to right, #ef4444, #3b82f6);
            position: relative;
            left: -100%;
            height: 100%;
            width: 200%;
            transform: translateX(0);
            transition: transform 0.6s ease-in-out;
        }
        .overlay-panel {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 40px;
            text-align: center;
            top: 0;
            height: 100%;
            width: 50%;
            color: white;
            transform: translateX(0);
            transition: transform 0.6s ease-in-out;
        }
        .overlay-left { transform: translateX(-20%); }
        .overlay-right { right: 0; transform: translateX(0); }
        .social-link {
            border: 1px solid #ddd;
            border-radius: 50%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin: 0 5px;
            height: 40px;
            width: 40px;
            color: #333;
            transition: background-color 0.2s;
        }
        .dark .social-link {
            border-color: #6b7280;
            color: #d1d5db;
        }
        .social-link:hover {
            background-color: #eee;
        }
        .dark .social-link:hover {
            background-color: #374151;
        }
      `}</style>
    </div>
  );
};

export default AuthForm;
