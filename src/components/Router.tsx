import React, { useEffect, useState } from "react";
import { RouterProps } from "../types/RouterProps";
import { RouteProps } from "../types/RouterProps";

const Router = ({ children }: RouterProps) => {
  const [pathname, setPathName] = useState(window.location.pathname);

  const routes = React.Children.toArray(
    children
  ) as React.ReactElement<RouteProps>[];

  useEffect(() => {
    const handleSetPath = () => {
      setPathName(window.location.pathname);
    };
    window.addEventListener("popstate", handleSetPath);

    return () => {
      window.removeEventListener("popstate", handleSetPath);
    };
  }, []);

  return routes.find((route) => route.props.path === pathname);
};

export default Router;
