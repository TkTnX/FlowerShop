import { AuthForm } from "../features";

export const LoginPage = () => {
  return (
    <div className="login">
      <AuthForm isRegister={false} />
      <img className="login__image" src={`/images/login.jpg`} alt="BG Image" />
    </div>
  );
};
