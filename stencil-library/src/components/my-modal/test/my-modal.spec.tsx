import { newSpecPage } from '@stencil/core/testing';
import { MyModal } from '../my-modal';

describe('my-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyModal],
      html: `<my-modal></my-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <my-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </my-modal>
    `);
  });
});
