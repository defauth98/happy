import Users from '../models/Users';

export default {
  render(users: Users) {
    return {
      id: users.id,
      email: users.email,
    };
  },
};
