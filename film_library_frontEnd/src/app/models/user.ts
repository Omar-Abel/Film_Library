export interface UserAuth {
  id: number;
  userName: string;
  token: string;
}

export interface UserLogin {
  userName: string;
  password: string;
}

export interface UserRegister {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}