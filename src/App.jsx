import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import { asyncUnsetAuthUser } from './states/authUser/asyncAction';
import { asyncPreloadProcess } from './states/isPreload/action';

function App() {
  const {
    authUser = null,
    isPreload = false,
    loading = false,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        {loading && <LoadingSpinner />}
        <Header />
        <main>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<LoginPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      <Header logout={onLogout} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
