export interface User {
  _id: string | undefined;
  email: string;
  name: string;
  address: string;
  isAdvisor: boolean;
  password: string;
}
