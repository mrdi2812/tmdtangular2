import { ProductSizeModule } from './product-size.module';

describe('ProductSizeModule', () => {
  let productSizeModule: ProductSizeModule;

  beforeEach(() => {
    productSizeModule = new ProductSizeModule();
  });

  it('should create an instance', () => {
    expect(productSizeModule).toBeTruthy();
  });
});
