import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as Schemas } from 'mongoose';

export interface IDocumentHotel extends Document, Hotel {}
export type HotelDocument = HydratedDocument<Hotel>;

@Schema()
export class Hotel {
  @Prop({ required: true, type: Schemas.Types.ObjectId })
  public title: string;

  @Prop()
  public description: string;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ required: true })
  public updatedAt: Date;
}

export const HotelModel = SchemaFactory.createForClass(Hotel);
