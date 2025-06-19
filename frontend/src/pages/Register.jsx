import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
const serverUrl = import.meta.env.VITE_SERVER_URL;
const Register = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const onRegister = async (data) => {
    try {
      const res = await axios.post(`${serverUrl}/auth/register`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (!res) {
        setError('There was an error registering the user.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onRegister)}>
        <input type="text" placeholder="Enter your name" {...register('name', { required: true })} />
        <input type="text" placeholder="Enter a unique username" {...register('username', { required: true })} />
        <input type="password" placeholder="Enter your password" {...register('password', { required: true })} />
        <input type="file" {...register('profilePhoto')} />
        <input type="submit" />
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default Register;
