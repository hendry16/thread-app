import React from 'react';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/asyncAction';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="mx-auto w-1/2 my-2 flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <LoginInput login={onLogin} />
    </section>
  );
}

export default LoginPage;
