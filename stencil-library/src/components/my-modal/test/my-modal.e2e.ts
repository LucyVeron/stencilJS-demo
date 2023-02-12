import { newE2EPage } from '@stencil/core/testing';

describe('my-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-modal></my-modal>');

    const element = await page.find('my-modal');
    expect(element).toHaveClass('hydrated');
  });
});
