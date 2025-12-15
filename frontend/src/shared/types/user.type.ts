import type { IFavorite } from "./favorite.type"

export interface IUser {
    date_joined: string,
    email: string,
    first_name: string,
    id: number,
    is_active: boolean,
    is_staff: boolean,
    last_login: string,
    last_name: string,
    username: string
    avatar?: string
    address?: string
    phone?: string
    gender?: string
    favorites: IFavorite[]
}