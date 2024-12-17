export interface AnnouncementDto {
  id: number;
  date: string;
  title: string;
  message: string;
  author: BasicUserDto;
}

export interface BasicUserDto {
  id: number;
  profile: ProfileDto;
  admin: boolean;
  active: boolean;
  status: string;
}

export interface ProfileDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
