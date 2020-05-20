import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntries } from '../api';

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    data.latitude = location.lat;
    data.longitude = location.long;
    await createLogEntries(data);
    onClose();
    try {
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <>
      <form className='entryForm' onSubmit={handleSubmit(onSubmit)}>
        {error ? <h3 className='error'>{error}</h3> : null}
        <label htmlFor='title'>Title</label>
        <input name='title' type='text' required ref={register} />
        <label htmlFor='comments'>Comments</label>
        <textarea name='comments' rows={3} ref={register} />
        <label htmlFor='description'>Description</label>
        <textarea name='description' rows={3} ref={register} />
        <label htmlFor='img'>Imagen</label>
        <input name='img' type='text' ref={register} />
        <label htmlFor='visitDate'>Visited date</label>
        <input name='visitDate' type='date' required ref={register} />
        <button type='submit' disabled={loading}>
          {loading ? 'Cargando...' : 'Marcar visita'}
        </button>
      </form>
    </>
  );
};

export default LogEntryForm;
