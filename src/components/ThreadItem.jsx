import React from 'react';
import { Link } from 'react-router-dom';
import {
  BiComment, BiDownvote, BiSolidDownvote, BiSolidUpvote, BiUpvote,
} from 'react-icons/bi';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import IconActionItem from './IconActionItem';
import CategoryItem from './CategoryItem';
import { threadPropTypes } from '../proptypes/propTypes';
import { showTimeAgo } from '../utils/date-formatter';

function ThreadItem({
  id, title, category, createdAt, body, totalComments,
  owner, upVotesBy, downVotesBy, children, authUser, upVote, downVote,
}) {
  const isUpVoted = upVotesBy.includes(authUser.id);
  const isDownVoted = downVotesBy.includes(authUser.id);

  function onUpVote() {
    upVote(id);
  }

  function onDownVote() {
    downVote(id);
  }

  return (
    <article className="border m-3 p-3 shadow rounded-lg backdrop-blur-xl bg-white/30">
      {children ? (
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      ) : (
        <Link to={`/threads/${id}`}>
          <h2 className="text-xl font-semibold text-gray-800 hover:underline">{title}</h2>
        </Link>
      )}
      <div className="flex items-center justify-between my-4">
        <div className="flex items-center">
          <img src={owner.avatar} className="w-12 h-12 rounded-lg" alt="" />
          <div className="ml-4 flex flex-col">
            <span className="text-m">{owner.name}</span>
            <span className="text-sm text-gray-600">{showTimeAgo(createdAt)}</span>
          </div>
        </div>
        <div>
          <CategoryItem category={category} />
        </div>
      </div>
      <div className={`text-m text-gray-600 ${!children && 'line-clamp-5'}`}>{parse(body)}</div>
      <div className={`${children ? 'border-y py-2' : 'border-t pt-2'} mt-2 flex gap-x-2`}>
        <IconActionItem
          icon={isUpVoted ? BiSolidUpvote : BiUpvote}
          value={upVotesBy.length}
          onClick={onUpVote}
          isUpVoted={isUpVoted}
        />
        <IconActionItem
          icon={isDownVoted ? BiSolidDownvote : BiDownvote}
          value={downVotesBy.length}
          onClick={onDownVote}
          isDownVoted={isDownVoted}
        />
        {!children
        && (
        <IconActionItem
          icon={BiComment}
          value={totalComments}
        />
        )}
      </div>
      {children}
    </article>
  );
}

ThreadItem.propTypes = {
  ...threadPropTypes,
  children: PropTypes.node,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  totalComments: PropTypes.number,
};

ThreadItem.defaultProps = {
  children: null,
  totalComments: null,
};
export default ThreadItem;
