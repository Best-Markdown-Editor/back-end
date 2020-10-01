export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export interface File {
  id: number;
  title: string;
  slug: string;
  body: string;
  publishedOn: string;
  updatedAt: string;
}

export interface Pub {
  id: number;
  title: string;
  slug: string;
  body: string;
  description: string;
  thumbnail: string;
  publishedOn: string;
  updatedAt: string;
}

export interface Folder {
  id: number;
  name: string;
  files: Pub[];
}
