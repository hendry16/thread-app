import PropTypes from 'prop-types';
import React from 'react';
import useInput from '../hooks/useInput';
import Button from './Button';
import ControlledInput from './ControlledInput';
import Textarea from './Textarea';

function ThreadInput({ addThread }) {
  const [title, setTitle, titleChangeHandler] = useInput('');
  const [category, setCategory, categoryChangeHandler] = useInput('');
  const [body, setBody, bodyChangeHandler] = useInput('');

  const submitHandler = (event) => {
    event.preventDefault();
    addThread({ title, category, body });
    setTitle('');
    setCategory('');
    setBody('');
  };

  return (
    <section className="border m-3 p-3 shadow rounded-lg backdrop-blur-xl bg-white/30">
      <h2 className="text-center text-xl font-semibold mb-3">Tambahkan Diskusi</h2>
      <form onSubmit={submitHandler} className="flex flex-col gap-y-2">
        <ControlledInput
          type="text"
          placeholder="Judul"
          value={title}
          onChange={titleChangeHandler}
        />
        <ControlledInput
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={categoryChangeHandler}
        />
        <Textarea
          placeholder="Tulis isi konten"
          value={body}
          onChange={bodyChangeHandler}
          rows={3}
        />
        <div className="mt-2">
          <Button type="submit" text="Tambah" />
        </div>
      </form>
    </section>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
