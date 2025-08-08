import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategorySidebar from '../components/CategorySidebar';
import ThreadInput from '../components/ThreadInput';
import ThreadList from '../components/ThreadList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncAddThread, asyncDownVoteThread, asyncUpVoteThread } from '../states/threads/action';

function HomePage() {
  const {
    users = [],
    threads = [],
    authUser = null,
  } = useSelector((states) => states);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpvote = (id) => {
    dispatch(asyncUpVoteThread(id));
  };

  const onDownvote = (id) => {
    dispatch(asyncDownVoteThread(id));
  };

  const onAddThread = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
  };

  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  const threadList = filteredThreads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId),
    authUser,
  }));

  const categories = [...new Set(threads.map((thread) => thread.category))];

  return (
    <main className="flex justify-start">
      <aside className="w-1/4 my-2">
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </aside>
      <section className="w-1/2 my-2">
        <ThreadInput addThread={onAddThread} />
        <ThreadList threads={threadList} upVote={onUpvote} downVote={onDownvote} />
      </section>
    </main>
  );
}

export default HomePage;
