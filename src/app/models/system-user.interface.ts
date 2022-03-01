import { Profile } from "./profile.interface";

export interface SystemUser{
    id: number,
    email: string,
    profile: Profile,
}

