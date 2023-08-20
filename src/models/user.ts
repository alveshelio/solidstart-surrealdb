export type User = {
  id: 'user:${string}';
  name: string;
  username: string;
  picture?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
