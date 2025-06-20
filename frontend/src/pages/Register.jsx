import { RegisterLayout } from '../layouts';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const Register = () => {
  const onRegister = async (data) => {
    try {
      const res = await axios.post(`${serverUrl}/auth/registe`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (!res) {
        toast.error('Server not responding!');
      }
    } catch (err) {
      console.log(err);
      toast.error(`There was an error in registering the user. Error: ${err.message}`);
    }
  };

  return (
    <>
      <RegisterLayout submitLogic={onRegister} />
    </>
  );
};

export default Register;
