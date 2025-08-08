import PropTypes from 'prop-types';
import React from 'react';
import UserScoreItem from './UserScoreItem';

function Leaderboard({ leaderboards, authUserId }) {
  return (
    <div className="border w-3/4 mx-3 p-3 shadow rounded-lg backdrop-blur-xl bg-white/30">
      <h2 className="text-center text-xl font-semibold mb-3">Leaderboard</h2>
      <div className="flex justify-between font-semibold border-y my-2 py-1">
        <div className="w-5/6 text-center">
          <span>User</span>
        </div>
        <div className="w-1/6 text-center">
          <span>Skor</span>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        {leaderboards.map(({ user, score }) => (
          <UserScoreItem
            user={user}
            score={score}
            authUserId={authUserId}
          />
        ))}
      </div>
    </div>
  );
}

Leaderboard.propTypes = {
  leaderboards: PropTypes.arrayOf({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    score: PropTypes.string.isRequired,
  }).isRequired,
  authUserId: PropTypes.string.isRequired,
};

export default Leaderboard;
