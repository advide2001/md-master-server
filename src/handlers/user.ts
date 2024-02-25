import { DeleteUserData, UserData } from './../models/user';
import { Request, Response } from 'express';
import { clerkWebhookSigningKey } from '../config/environment';
import { Webhook } from 'svix';
import {
  UserCreatedWebhook,
  UserDeletedWebhook,
  UserUpdatedWebhook
} from '../models/user';
import { UserCreateInput, UserUpdateInput, primaryDatabase } from '../utils/db';
import { Prisma } from '@prisma/client';

export const getUser = async (req: Request, res: Response) => {
  res.sendStatus(200);
};

export const getUserById = async (req: Request, res: Response) => {
  res.sendStatus(200);
};

const createUser = async (data: UserData) => {
  const user: UserCreateInput = {
    clerkID: data.id,
    displayName: data.username || '',
    email: data.email_addresses[0].email_address,
    firstName: data.first_name,
    lastName: data.last_name || '',
    avatarUrl: data.image_url
  };
  try {
    const createdUser = await primaryDatabase.user.create({ data: user });
    return createdUser;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') console.log(err.message);
    }
  }
};

const updateUser = async (data: UserData) => {
  console.log('update user');

  const user: UserUpdateInput = {
    displayName: data.username || '',
    firstName: data.first_name,
    lastName: data.last_name || '',
    avatarUrl: data.image_url
  };

  try {
    const updatedUser = await primaryDatabase.user.update({
      where: {
        clerkID: data.id
      },
      data: user
    });
    return updatedUser;
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (data: DeleteUserData) => {
  // delete or re-assign the Markdown Documents owned by the user
  try {
    const deletedUser = await primaryDatabase.user.delete({
      where: {
        clerkID: data.id
      }
    });
    return deletedUser;
  } catch (err) {
    console.log(err);
  }
};

export const handleUserCrud = async (req: Request, res: Response) => {
  if (!clerkWebhookSigningKey)
    throw new Error('you must insert the clerk webhook siging key in your env');

  // grab the headers and the body from the request
  const headers = req.headers;
  const payload = JSON.stringify(req.body);

  // get the svix headers for verification
  const svixId = headers['svix-id'] as string;
  const svixTimestamp = headers['svix-timestamp'] as string;
  const svixSignature = headers['svix-signature'] as string;

  // if there are missing svix headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error: missing svix headers', { status: 400 });
  }

  // initialize svix
  const wh = new Webhook(clerkWebhookSigningKey);
  let evt: UserCreatedWebhook | UserUpdatedWebhook | UserDeletedWebhook;

  // attempt to veify the incoming webhook request
  try {
    evt = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature
    }) as UserCreatedWebhook | UserUpdatedWebhook | UserDeletedWebhook;
  } catch (err) {
    // console log and return the error
    console.log('Webhook Verification Failed. Error: ' + err);
    return res.status(400).json({
      success: false,
      message: JSON.stringify(err)
    });
  }

  const eventType = evt.type;
  // switch on evt.type
  switch (eventType) {
    case 'user.deleted':
      deleteUser(evt.data);
      break;
    case 'user.created':
      createUser(evt.data);
      break;
    case 'user.updated':
      updateUser(evt.data);
      break;
    default:
      return new Response('Error: unrecognized event type', { status: 400 });
  }

  return res.status(200).json({
    success: true,
    message: 'Webhook Recieved'
  });
};
