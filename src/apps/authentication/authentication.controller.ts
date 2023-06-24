import { Request, Response } from 'express';

import { createUser } from '../user/service';

export async function registerController(
  req: Request<
    undefined,
    undefined,
    {
      username: string;
      name: string;
      password: string;
    }
  >,
  res: Response
) {
  try {
    const user = await createUser(req.body);

    res.send(user);
  } catch (err) {
    res.send({
      message: 'Failed to create user',
    });
  }
}
