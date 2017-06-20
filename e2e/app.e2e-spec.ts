import { MelekinhaPage } from './app.po';

describe('melekinha App', () => {
  let page: MelekinhaPage;

  beforeEach(() => {
    page = new MelekinhaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
