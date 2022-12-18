import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export interface IDocumentHotel extends Document, Hotel {}
export type HotelDocument = HydratedDocument<Hotel>;

@Schema()
export class Hotel {
  @Prop({ required: true })
  public title: string;

  @Prop()
  public description?: string;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ required: true })
  public updatedAt: Date;
}

const HotelModel = SchemaFactory.createForClass(Hotel);
HotelModel.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  let _object = object;
  if (_id) {
    _object = { id: _id, ..._object };
  }
  if (__v) {
    _object = { id: _id, ..._object, __v };
  }
  return _object;
});

export { HotelModel };
