import { newE2EPage } from '@stencil/core/testing';

describe('new-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<new-button></new-button>');

    const element = await page.find('new-button');
    expect(element).toHaveClass('hydrated');
  });
});
