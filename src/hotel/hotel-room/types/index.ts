import { TID } from 'src/types';

export interface IHotelRoom {
  hotel: TID;
  description: string;
  images: Array<string>;
  createdAt: Date;
  updatedAt: Date;
  isEnabled: boolean;
}

export interface ISearchRoomsParams extends Pick<IHotelRoom, 'hotel'> {
  limit: number;
  offset: number;
  isEnabled?: boolean;
}
