import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { apiUrl } from '@/lib/constants';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email().nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof schema>;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const checkValidToken = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(response.status === 200) {
        navigate('/profile');
      }

    } catch (error:any) {
      console.log("Invalid token");
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      checkValidToken();
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, data);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
    } catch (error:any) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
