// think data structure and actions:
export type AuthContextType = {
  isLoggedIn: boolean;
  username?: string;
  email?: string;
  id?: string;
  token?: string;
  favorite?: Array;
  favoritePro?: Array;
  login: (
    username: string,
    email: string,
    token: string,
    id: string,
    favorite: Array,
    favoritePro: Array
  ) => void;
  logout: () => void;
  isAdmin: boolean;
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
export interface LensData {
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
  isFavorite: boolean;
}
export interface ProLensData {
  _id: string;
  name: string;
  lensType: string;
  index: number;
  diameter: string;
  sphRange: {
    minus: number[] | null;
    plus: number[] | null;
  };
  adjustmentHeight: string | null;
  coating: string;
  price: number;
  isFavorite: boolean;
}
export interface LensFormData {
  sphRight: number;
  cylRight: number;
  sphLeft: number;
  cylLeft: number;
}
export interface LensProFormData {
  sphRight: number;
  sphLeft: number;
}
export interface LensOptions {
  rightEyeOptions: Lens[];
  leftEyeOptions: Lens[];
}
