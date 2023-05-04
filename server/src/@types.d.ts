// to make the file a module and avoid the TypeScript error
export {};

export type Role = {
  name: string;
};

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}