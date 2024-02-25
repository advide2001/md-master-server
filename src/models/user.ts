/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EmailAddress {
  email_address: string;
  id: string;
  linked_to: string[];
  object: string;
  reserved?: boolean;
  verification: {
    attempts: number | null;
    expire_at: number | null;
    status: string;
    strategy: string;
  };
}

export interface UserData {
  birthday: string;
  created_at: number;
  email_addresses: EmailAddress[];
  external_accounts: any[];
  external_id: string | null;
  first_name: string;
  gender: string;
  id: string;
  image_url: string;
  last_name: string | null;
  last_sign_in_at: number | null;
  object: string;
  password_enabled: boolean;
  phone_numbers: any[];
  primary_email_address_id: string;
  primary_phone_number_id: string | null;
  primary_web3_wallet_id: string | null;
  private_metadata: Record<string, any>;
  profile_image_url: string;
  public_metadata: Record<string, any>;
  two_factor_enabled: boolean;
  unsafe_metadata: Record<string, any>;
  updated_at: number;
  username: string | null;
  web3_wallets: any[];
}

export interface DeleteUserData {
  deleted: boolean;
  id: string;
  object: string;
}

export interface UserCreatedWebhook {
  data: UserData;
  object: string;
  type: 'user.created';
}

export interface UserUpdatedWebhook {
  data: UserData;
  object: string;
  type: 'user.updated';
}

export interface UserDeletedWebhook {
  data: DeleteUserData;
  object: string;
  type: 'user.deleted';
}
