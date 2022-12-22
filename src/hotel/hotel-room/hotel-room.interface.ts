import { TID } from 'src/common';

export interface IHotelRoom {
  hotel: TID;
  description: string;
  images?: Array<string>;
  createdAt: Date;
  updatedAt: Date;
  isEnabled: boolean;
}
