import { ProfileEditForm } from "../features";
import { Button } from "../shared";

export const ProfileInfoPage = () => {
  return (
    <section className="profileInfo">
      <div className="profileInfo__top">
        <h2>Your information</h2>
        <Button className="profileInfo__submit">Submit</Button>
      </div>
      <ProfileEditForm />
    </section>
  );
}
