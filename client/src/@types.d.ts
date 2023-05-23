// think data structure and actions:
export type AuthContextType = {
  isLoggedIn: boolean;
  username?: string;
  email?: string;
  token?: string;
  login: (username: string, email: string, token: string) => void;
  logout: () => void;
};

export type ChildProps = {
  children?: React.ReactNode;
};

export type RegisterFormType = {
  username: string;
  email: string;
  password: string;
};

export type LoginFormType = {
  email: string;
  password: string;
};


export interface Lens {
  name: string;
  index: string;
  diameter: string;
  minusRange: string;
  plusRange: string;
  coating: "none" | "anti-reflective" | "scratch-resistant";
  price: number;
}