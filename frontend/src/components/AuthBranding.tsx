import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthBranding: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center mb-6 cursor-pointer select-none" onClick={() => navigate('/') }>
      <img
        src={process.env.PUBLIC_URL + '/LearnMates-logo.png'}
        alt="LearnMates Logo"
        className="h-16 w-auto mb-2 drop-shadow-md"
        draggable={false}
      />
      <h1 className="text-3xl font-bold text-blue-700 tracking-tight">LearnMates</h1>
    </div>
  );
};

export default AuthBranding;