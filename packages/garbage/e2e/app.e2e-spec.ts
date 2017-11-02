import { NgGoldenLayoutDemoPage } from './app.po';

describe('ng-golden-layout-demo App', () => {
  let page: NgGoldenLayoutDemoPage;

  beforeEach(() => {
    page = new NgGoldenLayoutDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
