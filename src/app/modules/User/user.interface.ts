
export interface IUser {
  name: string;
  img: string;
  rating: number;
  email: string;
  password: string;
  role: 'admin' | 'user' ;
  social: boolean;

}