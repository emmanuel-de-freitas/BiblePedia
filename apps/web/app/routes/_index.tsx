import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function RootIndex() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
