import { ReactNode } from "react";

export interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  children?: ReactNode;
}
