import { ReactElement } from "react";
import { APIError } from "../../../utils/api";

interface ErrorComponentProps {
  error: APIError;
  children?: ReactElement | ((error: APIError) => ReactElement);
}

function ErrorComponent({ error, children }: ErrorComponentProps) {
  if (!children) {
    return <h1>{error.message}</h1>;
  }

  if (typeof children === "function") {
    return children(error);
  }

  return children;
}

export default ErrorComponent;
