import prisma from '../../utils/client';

async function retrieveUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: username,
    },
  });

  return user;
}

async function retrieveUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

async function createUser(newUser: {
  email: string;
  name: string;
  password: string;
}) {
  const user = await prisma.user.create({
    data: newUser,
  });

  return user;
}

export const UserDAO = {
  retrieveUserByUsername,
  retrieveUserById,
  createUser,
};
