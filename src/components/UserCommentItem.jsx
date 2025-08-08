import PropTypes from 'prop-types';
import React from 'react';
import parse from 'html-react-parser';
import {
  BiDownvote, BiSolidDownvote, BiSolidUpvote, BiUpvote,
} from 'react-icons/bi';
import IconActionItem from './IconActionItem';
import { showTimeAgo } from '../utils/date-formatter';

function UserCommentItem({
  id, content, createdAt, owner, upVotesBy, downVotesBy, authUserId, upvoteComment, downvoteComment,
}) {
  const isUpvoted = upVotesBy.includes(authUserId);
  const isDownvoted = downVotesBy.includes(authUserId);

  const onCommentUpvote = () => {
    upvoteComment(id);
  };

  const onCommentDownvote = () => {
    downvoteComment(id);
  };

  return (
    <div className="flex gap-2 border-b pb-2">
      <img className="h-12 w-12 m-1 rounded-lg" src={owner.avatar} alt="User Comment" />
      <div className="flex w-full justify-between">
        <div className="flex flex-col text-m">
          <span className="font-semibold">
            {owner.name}
            <span className="font-normal text-sm text-gray-500">
              <span className="mx-2 text-gray-700 font-bold">·</span>
              {showTimeAgo(createdAt)}
            </span>
          </span>
          <div className="text-gray-700">{parse(content)}</div>
        </div>
        <div className="flex gap-x-2">
          <IconActionItem
            icon={isUpvoted ? BiSolidUpvote : BiUpvote}
            onClick={onCommentUpvote}
            isUpVoted={isUpvoted}
            value={upVotesBy.length}
          />
          <IconActionItem
            icon={isDownvoted ? BiSolidDownvote : BiDownvote}
            onClick={onCommentDownvote}
            isDownVoted={isDownvoted}
            value={downVotesBy.length}
          />
        </div>
      </div>
    </div>
  );
}

UserCommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUserId: PropTypes.string.isRequired,
  upvoteComment: PropTypes.func.isRequired,
  downvoteComment: PropTypes.func.isRequired,
};

export default UserCommentItem;
