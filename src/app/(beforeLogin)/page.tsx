import { cookies } from "next/headers";
import LoginPage from "../_components/(login)/pages";

export interface Login {
  email: string;
  password: string;
}

const Login = () => {
  const cookie = cookies().get("auth")?.value;

  return <LoginPage hasAuth={!!cookie} />;
};

export default Login;
