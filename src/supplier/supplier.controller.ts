import { SupplierService } from './supplier.service';
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Request,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Req,
  Res,
} from '@nestjs/common';
import { SupplierEntity } from './entity/supplier.entity';
import { CreateSupplierTypeOrmDTO } from './dtos/create-supplier.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'untils/file-upload.utils';
import { Response } from 'express';
import { addAbortSignal } from 'stream';

@Controller('supplier')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  @Get()
  async findall(): Promise<SupplierEntity[]> {
    return await this.supplierService.findAll();
  }

  @Post()
  async Create(@Body() supplier: SupplierEntity): Promise<SupplierEntity> {
    return await this.supplierService.createSupliser(supplier);
  }

  @Get('/getdetail')
  async getdetail() {
    return await this.supplierService.findone();
  }

  @Get('typeorm/getall')
  async getall(): Promise<SupplierEntity[]> {
    return await this.supplierService.getAll();
  }

  @Post('typeorm/createrelationtypeorm')
  async createrelationtypeorm(
    @Body() createSupplierTypeOrmDTO: CreateSupplierTypeOrmDTO,
  ) {
    // console.log("-------------------------")
    // console.log(createSupplierTypeOrmDTO)
    const result = await this.supplierService.createsuppliertypeorm(
      createSupplierTypeOrmDTO,
    );
    return result;
  }

  @Post('/ReadFileExcel')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      // fileFilter: imageFileFilter,
    }),
  )
  async ReadFileExcel(@UploadedFile() file) {
    const reponse = {
      originalname: file.originalname,
      filename: file.filename,
    };
    await this.supplierService.ReadfileExcel(file.filename);
    return reponse;
  }

  @Get('/WriteFileExcel')
  async WriteFileExcel(@Res() response: Response) {
    const resultfile = await this.supplierService.WritefileExcel(response);
  }
}
