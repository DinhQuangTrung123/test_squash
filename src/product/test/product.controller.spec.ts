import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { ProductController } from '../product.controller';
import { Product } from '../schemas/product.schema';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { productstub } from './stubs/product.stub';
import { v4 as uuidv4 } from 'uuid';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';

// jest.mock('../product.service')

const ApiProductService = {
  provide: ProductService,
  useFactory: () => ({
    getProductById: jest.fn().mockResolvedValue(productstub()),
    getAllProducts: jest.fn().mockResolvedValue([productstub()]),
    addProduct: jest.fn().mockResolvedValue(productstub()),
    updateProduct: jest.fn().mockResolvedValue(productstub()),
    deleteProduct: jest.fn().mockResolvedValue(productstub()),
  }),
};

describe('ProductService', () => {
  let productservice: ProductService;
  let productcontroller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ProductController],
      providers: [ProductService, ApiProductService],
    }).compile();

    productcontroller = module.get<ProductController>(ProductController);
    productservice = module.get<ProductService>(ProductService);
    jest.clearAllMocks(); // clear tất cả thuộc tính data khi ta sử dụng mock
  });

  // it('should call saveNote method with expected params', async () => {
  //   const getProductById = jest.spyOn(productservice, 'getProductById');
  //   const findOneOptions: FindOneOptions = {};
  //   let product : Product
  //   product = await productcontroller.getProduct('637bac2364e7abfb2e13dc67')
  //   productservice.getProductById("637bac2364e7abfb2e13dc67");
  //   expect(productservice.getProductById).toBeCalledWith('637bac2364e7abfb2e13dc67');
  //   console.log(productstub())
  //   console.log("++++++++++++++++++++++++++++++++++++++++++++")
  //   // console.log(product)
  //   // expect(getProductById).toHaveBeenCalledWith(productstub());
  //   expect(product).toEqual(productstub());
  //   // console.log('-----------------------------------')
  //   // console.log(product)
  // });

  // it('should be defined', () => {
  //   expect(productservice).toBeDefined();
  //   expect(productcontroller).toBeDefined();
  // });

  describe('getProduct', () => {
    describe('when getProducts is called', () => {
      let product: Product;
      const fakeuuid = '637bac2364e7abfb2e13dc67';
      beforeEach(async () => {
        product = await productcontroller.getProduct(fakeuuid);
      });

      test('then it should call product service', async () => {
        expect(productservice.getProductById).toBeCalledWith(fakeuuid);
      });

      test('then is return a product', async () => {
        // expect(product).toHaveBeenCalled();
        expect(product).toEqual(productstub());
      });
    });
  });

  describe('createProduct', () => {
    describe('when createproduct is called', () => {
      let createProductDTO: CreateProductDTO;
      let product: Product;
      // const result
      beforeEach(async () => {
        product = await productcontroller.createProduct(createProductDTO);
      });

      test('then it should call productService', () => {
        try {
          expect(productservice.addProduct).toHaveBeenCalledWith(
            createProductDTO,
          );
        } catch (e) {
          // expect(e.message).toBe('Title is required.');
          console.log(e.message);
        }
      });

      test('then it should return a user', () => {
        try {
          expect(product).toEqual(productstub());
        } catch (e) {
          console.log(e.message);
          // expect(e.message).toBe('Title is required.');
        }
      });
    });
  });
});
