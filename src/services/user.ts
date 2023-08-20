import axios from 'axios';
import { User } from '~/models/user';

export const fetchUser = async (id: User['id']) => {
  const response = await axios.get<User>(
    `http://localhost:3000/api/users/${id}`
  );

  return response.data;
};
