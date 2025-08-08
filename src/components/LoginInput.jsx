import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import ControlledInput from './ControlledInput';
import Button from './Button';

function LoginInput({ login }) {
  const navigate = useNavigate();
  const [email, , emailChangeHandler] = useInput('');
  const [password, , passwordChangeHandler] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
    navigate('/');
  };

  return (
    <div className="border w-3/4 mx-3 p-3 shadow rounded-lg backdrop-blur-xl bg-white/30">
      <h2 className="text-center text-xl font-semibold mb-3">Login Akun</h2>
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-y-2">
        <ControlledInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={emailChangeHandler}
        />
        <ControlledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={passwordChangeHandler}
        />
        <div className="mt-2">
          <Button text="Login" />
          <p className="text-sm text-gray-700 mt-2 font-semibold">
            Belum punya akun?
            <Link to="/register" className="text-blue-500 hover:underline"> Daftar disini</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
