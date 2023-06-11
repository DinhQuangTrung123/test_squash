import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { ProductDTO, ParamPagDTO } from './dtos/filter-product.dto';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ObjectId } from 'mongodb'

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<ProductDocument>) { }

  // async getFilteredProducts(filterProductDTO: FilterProductDTO): Promise<Product[]> { //Promise khong giải quyết được trả ra lỗi
  //   const { category, search, id } = filterProductDTO;
  //   let products = await this.getAllProducts();

  //   if (search) {
  //     products = products.filter(product => 
  //       product.name.includes(search) ||
  //       product.description.includes(search)
  //     );
  //   }

  //   if (category) {
  //     products = products.filter(product => product.category === category)
  //   }

  //   if (id) {
  //       let product = await this.getProduct(id);
  //       return [product];
  //   }

  //   return products;
  // }

  async getAllProducts(productDTO: ProductDTO) {
    // console.log(paramPagDTO)
    const { filter, page } = productDTO;
    const pipeline = []
    let query_product = null

    if (filter) {
      query_product = this.productModel
        .aggregate([{
          $match:
          {
            // 'name': {'$regex': filter.search, '$options': 'i'}
            $or: [
              { 'name': { $regex: filter.search } },
              { 'category': { '$regex': filter.category, '$options': 'i' } }
            ]
          },
        },
        ])
    } else {
      query_product = this.productModel.find({})
      // .skip(page.offset)
      // .limit(page.limit)
      // .exec(); // exec() However, we recommend using .exec() because that gives you better stack traces.
    }
    // const total = await this.productModel.find({}).countDocuments({}).exec();
    const total = await this.productModel.count()
    // const total = await query_product.count()

    const qs_product = await query_product.skip((page.offset * page.limit) - page.limit)
      .limit(page.limit)
      .exec();

    let product_list = []

    // for (let product = 0; product< qs_product.length; product++){
    //   console.log(product)
    //   // product.id = product._id;
    //   // delete product._id;
    //   // delete product.__v;
    // }
    //cach 1
    const products = qs_product.map((product) => {
      const { name, description, urlimage, price, category } = product ?? {};
      product_list.push({
        id: product._id,
        name, description, urlimage, price, category
      })
    });
    // cách 2
    // const products = qs_product.map((product)=>{
    //     return {
    //       id : product._id,
    //       name: product.name,
    //       description: product.description,
    //       urlimage: product.urlimage,
    //       price: product.price,
    //       category: product.category
    //   }
    // })
    // urlimage: [],
    // _id: new ObjectId("6380909429b7c35f3a66d51c"),
    // name: 'product 7',
    // description: 'perfect',
    // price: 20,
    // category: 'pant',
    // __v: 0

    // qs_product.forEach((product)=>{
    //     console.log(product)
    //     // product.id = product._id;
    //     delete product._id;
    //     delete product.__v;
    //     products.push(product)
    // });

    // console.log(products)
    // console.log(page.limit)
    return { product_list: product_list, total: total, limit: page.limit, offset: page.offset }
  }

  async getProductById(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product does not exist!');
    const { name, description, urlimage, price, category } = product ?? {};
    return {
      id: product._id,
      name, description, urlimage, price, category
    }
  }

  async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const newProduct = await this.productModel.create(createProductDTO);
    // const result = await newProduct.save();
    const { name, description, urlimage, price, category } = newProduct ?? {};
    const productData = {
      id: newProduct._id,
      name, description, urlimage, price, category
    }
    return productData
  }

  async updateProduct(id: string, createProductDTO: CreateProductDTO): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, createProductDTO, { new: true });
    const { name, description, urlimage, price, category } = updatedProduct ?? {};
    const productData = {
        id: updatedProduct._id,
        name, description, urlimage, price, category
      }
    return productData;
  }

  async deleteProduct(id: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndRemove(id);
    return deletedProduct;
  }

  async deleteAllProduct(): Promise<any>{
     return await this.productModel.deleteMany({})
  }

  async uploadimageproduct(urlimage: string[], id: string): Promise<any> {
    // try {
    console.log(id)
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product does not exist!');
    const update = { "urlimage": urlimage };
    const updateproduct = await this.productModel.findByIdAndUpdate(
      id,
      update
    );
    return updateproduct;
    // }
    // catch{
    //   throw new NotFoundException('Argument passed in must be a single String of 12 bytes or a string of')
    // }

    // return
  }

}

