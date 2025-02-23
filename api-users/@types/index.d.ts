export type UserInBdd = 
  UserOutOfBdd & { 
    _id: string,
    created_at: string,
    updated_at: string
  };

export type UserOutOfBdd = {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  image?: string,
  description?: string,
  role_id: number,
}