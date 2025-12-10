import { useForm } from "react-hook-form";
import {
  editProfileSchema,
  FormInput,
  Skeleton,
  useUser,
  type EditProfileSchema,
} from "../shared";
import { zodResolver } from "@hookform/resolvers/zod";

export const ProfileEditForm = () => {
  const { user, isPending } = useUser();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
  });

  const onSubmit = (values: EditProfileSchema) => console.log(values);

  return (
    <>
      {isPending ? (
        <Skeleton width="100%" height="200px" />
      ) : (
        <div className="profileEdit">
          <div className="profileEdit__image">
            <label className="profileEdit__label">
              <input hidden type="file" />
              <img
                src={
                  user?.avatar
                    ? `${import.meta.env.VITE_PUBLIC_SERVER_MEDIA_URL}${
                        user.avatar
                      }`
                    : "/images/no-avatar.png"
                }
                alt="Avatar"
              />
              <span>Upload</span>
            </label>
          </div>
          <form className="profileEdit__form" onSubmit={handleSubmit(onSubmit)}>
            <FormInput placeholder="+7(___)___-___" label="Phone number" />
            <FormInput placeholder="johndoe@example.com" label="E-mail" />
            <FormInput placeholder="John" label="First Name" />
            <FormInput placeholder="Doe" label="Label Name" />
            <label className="formInput">
              <span>Gender</span>
              <select name="" className="authForm__input">
                <option value="" selected hidden>
                  Choose gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <FormInput
              placeholder="First street , aa block , red door"
              label="Address"
            />
          </form>
        </div>
      )}
    </>
  );
};
