import { validateId } from '../../../utils';
import { UserDAO } from '../user.dao';

export async function retrieveUserByUsername(username: string | undefined) {
  if (!username) throw Error('No username provided');

  const user = await UserDAO.retrieveUserByUsername(username);

  return user;
}

export async function retrieveUserById(id: string | number | undefined) {
  const user = await UserDAO.retrieveUserById(validateId(id));

  return user;
}

export async function createUser(body: {
  username: string;
  name: string;
  password: string;
}) {
  const validatedUser = {
    email: body.username,
    name: body.name,
    password: body.password,
  };
  const user = await UserDAO.createUser(validatedUser);

  return user;
}
