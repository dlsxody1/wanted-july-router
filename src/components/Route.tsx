import { RouteProps } from "../types/RouterProps";

export const Route = ({ path, component }: RouteProps) => {
  return window.location.pathname === path ? <div>{component}</div> : null;
};
