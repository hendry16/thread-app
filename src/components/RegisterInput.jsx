import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import ControlledInput from './ControlledInput';
import '../styles/RegisterInput.css';
import Button from './Button';
import { register } from '../utils/api';

function RegisterInput() {
  const navigate = useNavigate();
  const [name, , nameChangeHandler] = useInput('');
  const [email, , emailChangeHandler] = useInput('');
  const [password, , passwordChangeHandler] = useInput('');

  const onRegister = (event) => {
    event.preventDefault();
    register({ name, email, password });
    navigate('/');
  };

  return (
    <div className="border w-3/4 mx-3 p-3 shadow rounded-lg backdrop-blur-xl bg-white/30">
      <h2 className="text-center text-xl font-semibold mb-3">Daftar Akun</h2>
      <form className="flex flex-col gap-y-2" onSubmit={onRegister}>
        <ControlledInput type="text" placeholder="Name" value={name} onChange={nameChangeHandler} />
        <ControlledInput type="email" placeholder="Email" value={email} onChange={emailChangeHandler} />
        <ControlledInput type="password" placeholder="Password" value={password} onChange={passwordChangeHandler} />
        <div className="mt-2">
          <Button text="Daftar" />
          <p className="text-sm text-gray-700 mt-2 font-semibold">
            Sudah punya akun?
            <Link to="/login" className="text-blue-500 hover:underline"> Login disini</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterInput;
