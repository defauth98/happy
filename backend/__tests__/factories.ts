import faker from 'faker';
import factory from 'factory-girl';
import User from '../src/models/Users';

factory.define('User', User, {
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;
