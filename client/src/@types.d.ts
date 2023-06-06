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
  _id: string;
  name: string;
  category: string;
  index: number;
  diameter: string;
  sphRange: {
    minus: number[] | null;
    plus: number[] | null;
  };
  cylMax: number | null;
  coating: "none" | "anti-reflective" | "scratch-resistant";
  price: number;
}

export interface LensFormData {
  sphRight: number;
  cylRight: number;
  sphLeft: number;
  cylLeft: number;
}
export interface LensOptions {
  rightEyeOptions: Lens[];
  leftEyeOptions: Lens[];
}