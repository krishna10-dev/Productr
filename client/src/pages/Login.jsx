import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOtp, verifyOtp } from '../services/api';

const Login = ({initialMode = 'Login'}) => {
  const [isSignup, setIsSignup] = useState(initialMode === 'signup');
  const [inputValue, setInputValue] = useState(''); 
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsSignup(initialMode === 'signup');
}, [initialMode]);

  const getLoginData = () => {
    if (inputValue.includes('@')) {
      return { email: inputValue };
    } else {
      return { phone: inputValue };
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = getLoginData();
      // Pass 'signup' or 'login' based on current state
      const type = isSignup ? 'signup' : 'login';
      
      const { data } = await sendOtp(payload, type);
      
      setShowOtp(true);
      alert(`${type.toUpperCase()} OTP: ${data.otp}`); 
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    setLoading(true);

    try {
      const payload = { ...getLoginData(), otp: enteredOtp };
      const { data } = await verifyOtp(payload);
      
      localStorage.setItem('token', data.token); 
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/products');
    } catch (error) {
      alert(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling && element.value) element.nextSibling.focus();
  };

  // Reset form when switching modes
  const toggleMode = () => {
    setIsSignup(!isSignup);
    setShowOtp(false);
    setOtp(['', '', '', '', '', '']);
    setInputValue('');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-orange-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl flex w-full max-w-4xl overflow-hidden h-[600px]">
        {/* Visual Side */}
        <div className="w-1/2 relative hidden md:block">
           <div className={`absolute inset-0 bg-gradient-to-br ${isSignup ? 'from-orange-900/80 to-red-900/80' : 'from-indigo-900/80 to-purple-900/80'} mix-blend-multiply z-10 transition-colors duration-500`}></div>
           <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80" alt="Login Visual" className="w-full h-full object-cover"/>
           <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 text-white">
              <h2 className="text-3xl font-bold mb-2">
                {isSignup ? "Join our Community" : "Uplist your product to market"}
              </h2>
              <div className="h-1 w-20 bg-orange-500 rounded"></div>
           </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-8">
             <h1 className="text-2xl font-bold text-slate-800">Productr</h1>
             <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            {isSignup ? "Enter details to get started" : "Login to access your dashboard"}
          </p>

          {!showOtp ? (
            <form onSubmit={handleSendOtp}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email or Phone Number</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  placeholder="e.g. user@example.com or 9876543210"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  required
                />
              </div>
              <button disabled={loading} className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition disabled:bg-gray-400">
                {loading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Get Login OTP')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Enter Verification Code</label>
                <div className="flex justify-between gap-2">
                  {otp.map((data, index) => (
                    <input key={index} type="text" maxLength="1" className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-bold focus:ring-2 focus:ring-blue-900 focus:outline-none" value={data} onChange={(e) => handleOtpChange(e.target, index)} onFocus={(e) => e.target.select()} />
                  ))}
                </div>
              </div>
              <button disabled={loading} className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition disabled:bg-gray-400">
                 {loading ? 'Verifying...' : (isSignup ? 'Complete Signup' : 'Login')}
              </button>
              <button type="button" onClick={() => setShowOtp(false)} className="w-full mt-4 text-gray-500 text-sm hover:text-blue-900">Change Contact Info</button>
            </form>
          )}

          {/* TOGGLE SWITCH */}
          <div className="mt-8 text-center border-t pt-6">
            <p className="text-sm text-gray-600">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button 
                onClick={toggleMode}
                className="ml-2 font-bold text-blue-900 hover:underline"
              >
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;