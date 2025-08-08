import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Leaderboard from '../components/Leaderboard';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const {
    authUser,
    leaderboards = null,
  } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  if (leaderboards === null) {
    return null;
  }

  return (
    <section className="mx-auto w-1/2 my-4 flex justify-center">
      <Leaderboard leaderboards={leaderboards} authUserId={authUser.id} />
    </section>
  );
}

export default LeaderboardPage;
