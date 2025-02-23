export type PostInBdd = 
  PostOutOfBdd & { 
    _id: string,
    created_at: string,
    updated_at: string
  };

export type PostOutOfBdd = {
  title: string,
  body: string,
  image?: string,
  user_id: string,
}