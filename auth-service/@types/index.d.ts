export interface CreateTokenData {
  id: string,
  role: number,
  email: string,
};

export interface User {
  _id: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  image?: string,
  description?: string,
  role_id: number,
  created_at: string,
  updated_at: string
};