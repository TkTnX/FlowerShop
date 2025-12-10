import { useRef } from "react";
import { ProfileEditForm } from "../features";
import { Button } from "../shared";

export const ProfileInfoPage = () => {
  const formRef = useRef<null | HTMLFormElement>(null)
  return (
    <section className="profileInfo">
      <div className="profileInfo__top">
        <h2>Your information</h2>
        <Button
          onClick={() => formRef.current?.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true}))}
          form="edit-profile"
          type="button"
          className="profileInfo__submit"
        >
          Submit
        </Button>
      </div>
      <ProfileEditForm formRef={formRef} />
    </section>
  );
};
