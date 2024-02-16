import { Request, Response } from 'express';
import { clerkWebhookSigningKey } from '../config/environment';
import { Webhook } from 'svix';
import {
  UserCreatedWebhook,
  UserDeletedWebhook,
  UserUpdatedWebhook
} from '../models/user';

export const getUser = async (req: Request, res: Response) => {
  res.sendStatus(200);
};

export const getUserById = async (req: Request, res: Response) => {
  res.sendStatus(200);
};

const createUser = async () => {
  console.log('create user');
};

const updateUser = async () => {
  console.log('update user');
};

const deleteUser = async () => {
  console.log('delete user');
  console.log('delete markdown documnts belowing to the user');
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

  // Grab the ID and TYPE of the Webhook
  const { id } = evt.data;
  const eventType = evt.type;

  // do something with evt depending on the type of the event
  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', evt.data);

  // switch on evt.type
  switch (eventType) {
    case 'user.deleted':
      deleteUser();
      break;
    case 'user.created':
      createUser();
      break;
    case 'user.updated':
      updateUser();
      break;
    default:
      return new Response('Error: unrecognized event type', { status: 400 });
  }

  return res.status(200).json({
    success: true,
    message: 'Webhook Recieved'
  });
};
