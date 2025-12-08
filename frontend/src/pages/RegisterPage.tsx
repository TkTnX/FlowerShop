import { AuthForm } from "../features";

export const RegisterPage = () => {
  return (
    <div className="register">
      <AuthForm isRegister={true} />
      <img
        className="register__image"
        src={`/images/register.jpg`}
        alt="BG Image"
      />
    </div>
  );
};
