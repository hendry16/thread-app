import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import {
  asyncReceiveThreadDetail, asyncUpVoteThreadDetail, asyncDownVoteThreadDetail,
  asyncDownVoteComment, asyncUpVoteComment, asyncAddCommentThreadDetail,
} from '../states/detailTread/action';
import ThreadDetail from '../components/ThreadDetail';

function DetailPage() {
  const { id } = useParams('id');
  const dispatch = useDispatch();
  const {
    detailThread = null,
    authUser,
  } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpvote = () => {
    dispatch(asyncUpVoteThreadDetail());
  };

  const onDownvote = () => {
    dispatch(asyncDownVoteThreadDetail());
  };

  const onUpvoteComment = (commentId) => {
    dispatch(asyncUpVoteComment(commentId));
  };

  const onDownvoteComment = (commentId) => {
    dispatch(asyncDownVoteComment(commentId));
  };

  const onAddComment = (content) => {
    dispatch(asyncAddCommentThreadDetail(id, content));
  };

  if (detailThread === null) {
    return null;
  }

  const thread = _.pick(detailThread, ['id', 'title', 'category', 'body', 'createdAt', 'owner', 'upVotesBy', 'downVotesBy']);
  const { comments } = detailThread;

  return (
    <section className="mx-auto w-1/2 my-2">
      <ThreadDetail
        thread={thread}
        comments={comments}
        upVote={onUpvote}
        downVote={onDownvote}
        authUser={authUser}
        upvoteComment={onUpvoteComment}
        downvoteComment={onDownvoteComment}
        addComment={onAddComment}
      />
    </section>
  );
}

export default DetailPage;
