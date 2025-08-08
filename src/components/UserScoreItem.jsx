import React from 'react';
import PropTypes from 'prop-types';

function UserScoreItem({ user, score, authUserId }) {
  const { id, name, avatar } = user;

  return (
    <div className="flex justify-between">
      <div className="w-5/6 flex items-center gap-x-2">
        <img src={avatar} alt="User Avatar" className="h-9 w-9 rounded-lg ml-3" />
        <span>
          {name}
          {(id === authUserId) && <span className="font-semibold ml-2">(me)</span>}
        </span>
      </div>
      <div className="w-1/6 flex text-center items-center justify-center">
        <span>{score}</span>
      </div>
    </div>
  );
}

UserScoreItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.string.isRequired,
  authUserId: PropTypes.string.isRequired,
};

export default UserScoreItem;
