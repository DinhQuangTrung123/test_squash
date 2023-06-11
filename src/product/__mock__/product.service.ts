import { productstub } from "../test/stubs/product.stub"

export const ProductService = jest.fn().mockReturnValue({
    getProductById: jest.fn(() => { return Promise.resolve(productstub()) }),//jest.fn().mockResolvedValue(productstub()),
    getAllProducts: jest.fn(() => { return Promise.resolve([productstub()])}),
    addProduct: jest.fn(() => { return Promise.resolve(productstub()) }),
    updateProduct: jest.fn(() => { return Promise.resolve(productstub()) }),
    deleteProduct: jest.fn(() => { return Promise.resolve(productstub()) }),
})