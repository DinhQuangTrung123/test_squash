import { Controller,Res, Post, Get, Put, Delete, Body, Param, Query,Inject, NotFoundException, ValidationPipe, UsePipes, forwardRef, UploadedFile, UploadedFiles} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ProductDTO } from './dtos/filter-product.dto';
import { UseInterceptors } from '@nestjs/common';
import { FormatResponseInterceptor } from '../reponse/format-response.interceptor';
import { LoggerService } from 'src/logger/logger.service';
import { Product } from './schemas/product.schema';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import {FilesInterceptor} from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'untils/file-upload.utils';
import { diskStorage } from 'multer';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Cron } from '@nestjs/schedule';
import { CronExpression, Interval, Timeout } from '@nestjs/schedule/dist';

@Controller('store/products')
export class ProductController {
  constructor(@Inject(forwardRef(() => ProductService)) 
    private productService: ProductService,
    // private schedulerRegistry: SchedulerRegistry
  ) { }


  

    // @Post('/')
    // async getProducts(@Query() filterProductDTO: FilterProductDTO) {
    //     console.log(filterProductDTO)
    //     const allProducts = await this.productService.getAllProducts();
    //     return allProducts;
    //     // if (Object.keys(filterProductDTO).length) {
    //     //     const filteredProducts = await this.productService.getFilteredProducts(filterProductDTO);
    //     //     return filteredProducts;
    //     // } else {
    //     //     const allProducts = await this.productService.getAllProducts();
    //     //     return allProducts;
    //     // }
    // }

    @Post('/getProducts/')
    @UseInterceptors(FormatResponseInterceptor)
    async getProducts(@Body() filterProductDTO: ProductDTO){
        const allProducts = await this.productService.getAllProducts(filterProductDTO);
        // LoggerService.warn("+++++++++++++++++++++++++=")
        return allProducts;
    }

    @Post('/createProduct/')          
    // @UsePipes(new ValidationPipe({ transform: true }))
    async createProduct(@Body() createProductDTO: CreateProductDTO): Promise<Product> {
        const product = await this.productService.addProduct(createProductDTO);
        return product;
    }

    @Get('/:id')
    async getProduct(@Param('id') id: string){
        const product = await this.productService.getProductById(id);
        // if (!product) throw new NotFoundException('Product does not exist!');
        return product; 
    }

    @Put('/:id')
    async updateProduct(@Param('id') id: string, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.updateProduct(id, createProductDTO);
        if (!product) throw new NotFoundException('Product does not exist!');
        return product;
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id: string) {
        const product = await this.productService.deleteProduct(id);
        if (!product) throw new NotFoundException('Product does not exist');
        return {"delete":"success"};
    }

    @Post('/delete-all-product')
    async deleteAllProductcontroler(){
       await this.productService.deleteAllProduct();
       return {"delete":"success"}
    }

    @Post('/uploadfile')
    @UseInterceptors(
        FileInterceptor(
            'image',{
            storage: diskStorage({
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadedFile(@UploadedFile() file: Express.Multer.File, @Body("id") id: string){
        const reponse = {
            originalname: file.originalname,
            filename : file.filename
        }
        await this.productService.uploadimageproduct([file.filename], id);
        return reponse
    }

    @Post('/multipleuploadfile')
    @UseInterceptors(
        FilesInterceptor(
            'images', 3, {
            storage: diskStorage({
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async MutilUploadedFile(@UploadedFiles() files, @Body("id") id: string){
        let reponse = []
        let filesname = []
        files.forEach((file)=>{
            const filereponse = {
                originalname: file.originalname,
                filename : file.filename
            };
            filesname.push(file.filename)
            reponse.push(filereponse)
        });
        await this.productService.uploadimageproduct(filesname, id);
        // console.log(reponse)
        return reponse
    }

    @Get('seeUploadedFile/:imgpath')
    async seeUploadedFile(@Param('imgpath') image, @Res() res) {
        // console.log(image)
        return res.sendFile(image, { root: './files' });
    }


}


// import { Controller, Post, Get, Put, Delete, Body, Param, Query,Inject, NotFoundException, ValidationPipe, UsePipes, forwardRef } from '@nestjs/common';
// import { ProductService } from './product.service';
// import { CreateProductDTO } from './dtos/create-product.dto';
// import { ProductDTO } from './dtos/filter-product.dto';
// import { UseInterceptors } from '@nestjs/common';
// import { FormatResponseInterceptor } from '../reponse/format-response.interceptor';
// import { LoggerService } from 'src/logger/logger.service';

// @Controller('/store/products')
// export class ProductController {
//   constructor(@Inject(forwardRef(() => ProductService)) private productService: ProductService) { }
//     // @MessagePattern('user-topic') // topic name here
    
//     // @UseInterceptors(FormatResponseInterceptor)
//     @Post('/getProducts/')   
//     @UseInterceptors(FormatResponseInterceptor)
//     async getProducts(@Body() filterProductDTO: ProductDTO) {
//         const allProducts = await this.productService.getAllProducts(filterProductDTO);
//         LoggerService.warn("+++++++++++++++++++++++++=")
//         return allProducts;
//     }

//     @Post('/createProduct/')          
//     // @UsePipes(new ValidationPipe({ transform: true }))
//     async createProduct(@Body() createProductDTO: CreateProductDTO) {
//         const product = await this.productService.addProduct(createProductDTO);
//         return product;
//     }

//     @Get('/:id')
//     async getProduct(@Param('id') id: string) {
//         const product = await this.productService.getProduct(id);
//         if (!product) throw new NotFoundException('Product does not exist!');
//         return product; 
//     }

//     @Put('/:id')
//     async updateProduct(@Param('id') id: string, @Body() createProductDTO: CreateProductDTO) {
//         const product = await this.productService.updateProduct(id, createProductDTO);
//         if (!product) throw new NotFoundException('Product does not exist!');
//         return product;
//     }

//     @Delete('/:id')
//     async deleteProduct(@Param('id') id: string) {
//         const product = await this.productService.deleteProduct(id);
//         if (!product) throw new NotFoundException('Product does not exist');
//         return product;
//     }

// }
