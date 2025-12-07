import { useForm } from "react-hook-form";
import {
  axiosInstance,
  Block,
  Button,
  loginSchema,
  registerSchema,
  useUser,
  type LoginSchema,
  type RegisterSchema,
} from "../shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
interface Props {
  isRegister: boolean;
}

export const AuthForm = ({ isRegister = false }: Props) => {
  const { user, isPending: isUserPending } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema | LoginSchema>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["authentication"],
    mutationFn: async (values: RegisterSchema | LoginSchema) => {
      const url = isRegister ? "/users/auth/register/" : "/users/auth/login/";
      const res = await axiosInstance.post(url, values);

      return res.data;
    },
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/profile");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // TODO: Доделать авторизацию

  const onSubmit = (values: RegisterSchema | LoginSchema) => {
    if (user) {
      return navigate("/profile");
    }
    mutate(values);
  };

  useEffect(() => {
    if (user && !isUserPending) {
      navigate("/profile");
      return;
    }
  }, [isUserPending, navigate, user]);

  return (
    <Block className="authForm">
      <h3 className="authForm__title">
        {isRegister ? "Регистрация" : "Авторизация"}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="authForm__form">
        <input
          disabled={isPending}
          placeholder="Имя пользователя"
          className="authForm__input"
          {...register("username")}
        />
        {errors.username && (
          <p className="error-message">{errors.username.message}</p>
        )}
        {isRegister && (
          <>
            <input
              disabled={isPending}
              placeholder="E-mail"
              className="authForm__input"
              {...register("email")}
            />
            {"email" in errors && errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </>
        )}

        <input
          disabled={isPending}
          placeholder="******"
          className="authForm__input"
          {...register("password")}
          type="password"
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
        <Button
          disabled={isPending}
          type={"submit"}
          className="authForm__button"
        >
          {isRegister ? "Зарегистрироваться" : "Войти"}
        </Button>
        <p className="authForm__link">
          {isRegister ? (
            <>
              Уже есть аккаунт? <Link to={"/auth/login"}>Войти</Link>{" "}
            </>
          ) : (
            <>
              Ещё нет аккаунта? <Link to={"/auth/register"}>Регистрация</Link>{" "}
            </>
          )}
        </p>
      </form>
    </Block>
  );
};
