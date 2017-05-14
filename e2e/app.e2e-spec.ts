import { SwaggerTypescriptDataPage } from './app.po';

describe('swagger-typescript-data App', () => {
  let page: SwaggerTypescriptDataPage;

  beforeEach(() => {
    page = new SwaggerTypescriptDataPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
