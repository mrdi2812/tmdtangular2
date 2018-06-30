import { ProductColorModule } from './product-color.module';

describe('ProductColorModule', () => {
  let productColorModule: ProductColorModule;

  beforeEach(() => {
    productColorModule = new ProductColorModule();
  });

  it('should create an instance', () => {
    expect(productColorModule).toBeTruthy();
  });
});
