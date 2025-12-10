import { useForm } from "react-hook-form";
import {
  axiosInstance,
  editProfileSchema,
  FormInput,
  Skeleton,
  useUser,
  type EditProfileSchema,
} from "../shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type Ref } from "react";
import { useMutation } from "@tanstack/react-query";

interface Props {
  formRef: Ref<HTMLFormElement>;
}

export const ProfileEditForm = ({ formRef }: Props) => {
  const { user, isPending } = useUser();
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      address: user?.address || "",
      gender: user?.gender || "",
      email: user?.email || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      phone: user?.phone || "",
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["edit user"],
    mutationFn: async (values: EditProfileSchema) => {
      const formData = new FormData();

      for (const key in values) {
        const type = key as keyof EditProfileSchema
        if (values[type] !== undefined) {
          formData.append(key, values[type]);
        }
      }

      const res = await axiosInstance.patch("/users/edit/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        address: user.address || "",
        gender: user.gender || "",
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (values: EditProfileSchema) => mutate(values);
  return (
    <>
      {isPending ? (
        <Skeleton width="100%" height="200px" />
      ) : (
        <div className="profileEdit">
          <div className="profileEdit__image">
            <label className="profileEdit__label">
              <input
                {...(register("avatar"),
                {
                  onChange: (e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setValue("avatar", e.target.files[0]);
                    }
                  },
                })}
                hidden
                type="file"
              />
              <img
                src={
                  user?.avatar
                    ? `${
                        import.meta.env.VITE_PUBLIC_SERVER_URL
                      }${user.avatar.slice(1)}`
                    : "/images/no-avatar.png"
                }
                alt="Avatar"
              />
              <span>Upload</span>
            </label>
          </div>
          <form
            ref={formRef}
            id="edit-profile"
            className="profileEdit__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              errors={errors}
              {...register("phone")}
              placeholder="+7(___)___-___"
              label="Phone number"
            />
            <FormInput
              errors={errors}
              {...register("email")}
              placeholder="johndoe@example.com"
              label="E-mail"
            />
            <FormInput
              errors={errors}
              {...register("first_name")}
              placeholder="John"
              label="First Name"
            />
            <FormInput
              errors={errors}
              {...register("last_name")}
              placeholder="Doe"
              label="Last Name"
            />
            <label className="formInput">
              <span>Gender</span>
              <select {...register("gender")} className="authForm__input">
                <option value="" selected hidden>
                  Choose gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <FormInput
              errors={errors}
              {...register("address")}
              placeholder="First street , aa block , red door"
              label="Address"
            />
          </form>
        </div>
      )}
    </>
  );
};
