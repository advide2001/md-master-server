import { Request, Response } from 'express';
import { primaryDatabase } from '../utils/db';
import { clerkWebhookSigningKey } from '../config/environment';
import { Webhook } from 'svix';

export const getUser = async (req: Request, res: Response) => {
  res.sendStatus(200);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await primaryDatabase.user.findUnique({
    where: { user_id: req.params.id }
  });
  if (user == null) res.sendStatus(404);
  res.json({ data: user });
};

export const handleUserCrud = async (req: Request, res: Response) => {
  if (!clerkWebhookSigningKey)
    throw new Error('you must insert the clerk webhook siging key in your env');

  // grab the headers and the body from the request
  const headers = req.headers;
  const payload = req.body;

  console.log(payload);
  console.log(typeof payload);
  const parsedPayload = JSON.parse(payload.toString());
  console.log(parsedPayload);
  console.log(typeof parsedPayload);

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
  let evt: string;

  // attempt to veify the incoming webhook request
  try {
    evt = wh.verify(parsedPayload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature
    }) as string;
  } catch (err) {
    // console log and return the error
    console.log('Webhook Verification Failed. Error: ' + err);
    return res.status(400).json({
      success: false,
      message: JSON.stringify(err)
    });
  }

  console.log(evt);

  return res.status(200).json({
    success: true,
    message: 'Webhook Recieved'
  });
};
