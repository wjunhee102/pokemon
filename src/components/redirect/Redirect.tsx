import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RedirectProps {
  to: string;
}

function Redirect({ to }: RedirectProps) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, [navigate, to]);

  return null;
}

export default Redirect;
