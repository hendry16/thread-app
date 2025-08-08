import PropTypes from 'prop-types';
import React from 'react';
import useInput from '../hooks/useInput';
import { commentPropTypes, threadPropTypes } from '../proptypes/propTypes';
import Button from './Button';
import Textarea from './Textarea';
import ThreadItem from './ThreadItem';
import UserCommentItem from './UserCommentItem';

function ThreadDetail({
  thread, comments, upVote, downVote, authUser, upvoteComment, downvoteComment, addComment,
}) {
  const [content, setContent, contentChangeHandler] = useInput('');

  const onSubmitComment = (event) => {
    event.preventDefault();
    addComment(content);
    setContent('');
  };

  return (
    <ThreadItem {...thread} upVote={upVote} downVote={downVote} authUser={authUser}>
      <section>
        <div className="my-2">
          <h3 className="font-semibold">{`Komentar (${comments.length})`}</h3>
        </div>
        <div className="mb-3">
          <form onSubmit={onSubmitComment}>
            <Textarea
              placeholder="Tambahkan komentar..."
              value={content}
              onChange={contentChangeHandler}
              rows={1}
            />
            <Button type="submit" text="Tambah" hidden={!content} />
          </form>
        </div>
        <div className="flex flex-col gap-3">
          {comments.map((comment) => (
            <UserCommentItem
              {...comment}
              key={comment.id}
              authUserId={authUser.id}
              upvoteComment={upvoteComment}
              downvoteComment={downvoteComment}
            />
          ))}
        </div>
      </section>
    </ThreadItem>
  );
}

ThreadDetail.propTypes = {
  ...threadPropTypes,
  ...commentPropTypes,
  upvoteComment: PropTypes.func.isRequired,
  downvoteComment: PropTypes.func.isRequired,
};

export default ThreadDetail;
