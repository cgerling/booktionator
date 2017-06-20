import { BooktionatorPage } from './app.po';

describe('Booktionator App', () => {
  let page: BooktionatorPage;

  beforeEach(() => {
    page = new BooktionatorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
