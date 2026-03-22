import { useNavigate } from "react-router-dom";

const LoginFormWrapper = () => {
  const navigate = useNavigate();

  return <LoginForm navigate={navigate} />;
};

export default LoginFormWrapper;