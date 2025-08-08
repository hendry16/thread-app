import PropTypes from 'prop-types';
import React from 'react';
import { threadPropTypes } from '../proptypes/propTypes';
import ThreadItem from './ThreadItem';

function ThreadList({ threads, upVote, downVote }) {
  return (
    <>
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          upVote={upVote}
          downVote={downVote}
        />
      ))}
    </>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({
    ...threadPropTypes,
    totalComments: PropTypes.number.isRequired,
  })).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ThreadList;
