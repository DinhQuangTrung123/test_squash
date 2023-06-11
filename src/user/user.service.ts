import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDTO } from './dtos/create-user.dto';
// import * as bcrypt from 'bcrypt';
const bcrypt = require('bcryptjs')

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

  async addUser(createUserDTO: CreateUserDTO){
    const user = await this.userModel.findOne({email: createUserDTO.email});
    const newUser = await this.userModel.create(createUserDTO);
    if (user) throw new NotFoundException('Email is exist!');
    newUser.password = await bcrypt.hash(newUser.password, 10);
    newUser.save()
    return {"register": "successful"};
  }

  async findUser(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({email: email});
    return user;
  }
}