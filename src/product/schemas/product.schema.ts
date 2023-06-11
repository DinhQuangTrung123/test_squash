import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, SchemaTypes, } from 'mongoose'

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  // Define a transform function to return id instead of _id
  @Prop({ type: String, transform: (value: any) => value.toString() })
  id: string;
  
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  category: string;

  @Prop([String])
  urlimage: string[];

}
  
export const ProductSchema = SchemaFactory.createForClass(Product);

// ProductSchema.method('toClient', function() {
//   var obj = this.toObject();
//   console.log('--------------------------')
//   console.log(obj)
//   //Rename fields
//   obj.id = obj._id;
//   delete obj._id;

//   return obj;
// }); 
