import { newSpecPage } from '@stencil/core/testing';
import { NewButton } from '../new-button';

describe('new-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NewButton],
      html: `<new-button></new-button>`,
    });
    expect(page.root).toEqualHtml(`
      <new-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </new-button>
    `);
  });
});
