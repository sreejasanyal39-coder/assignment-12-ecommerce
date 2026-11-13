import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Lock, User, GraduationCap, ShieldCheck } from 'lucide-react';
import { selectLoginModalOpen, setLoginModalOpen, login } from '../features/auth/authSlice';

export default function LoginModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectLoginModalOpen);
  const [email, setEmail] = useState('sreeja.sanyal@technoindia.edu.in');
  const [name, setName] = useState('Sreeja Sanyal');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ name, email }));
  };

  const handleQuickStudentLogin = () => {
    dispatch(login({
      name: 'Sreeja Sanyal',
      email: 'sreeja.sanyal@technoindia.edu.in'
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => dispatch(setLoginModalOpen(false))}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Student Portal Login</h3>
          <p className="text-xs text-slate-500 mt-1">
            Simulate Redux authentication state session
          </p>
        </div>

        {/* 1-Click Fast Student Login */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200">
          <div className="flex items-center gap-3">
            <img 
              src="/student-id.jpg" 
              alt="Sreeja Sanyal" 
              className="w-12 h-12 rounded-xl object-cover border border-indigo-300"
            />
            <div className="text-left flex-1">
              <h4 className="font-extrabold text-sm text-slate-800">SREEJA SANYAL</h4>
              <p className="text-[11px] text-indigo-600 font-semibold">TIU • BCA(H) • 231001102019</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickStudentLogin}
            className="mt-3 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>1-Click Login as Sreeja Sanyal</span>
          </button>
        </div>

        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <span className="relative bg-white px-2 text-[11px] font-semibold text-slate-400 uppercase">Or custom credentials</span>
        </div>

        {/* Custom input form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-md"
          >
            Sign In with Redux Auth
          </button>
        </form>
      </div>
    </div>
  );
}
