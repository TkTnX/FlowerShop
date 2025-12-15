import { ProfileFavoritesList } from "../widgets"

export const ProfileFavoritesPage = () => {
  return (
      <div className='favorites'>
          <h2 className="favorites__title">Your favorites</h2>
          <ProfileFavoritesList />
    </div>
  )
}
