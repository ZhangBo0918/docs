import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { test, describe, expect } from 'vitest';

describe('Markdown compile cases', async () => {
  const processor = unified();
  processor.use(remarkParse).use(remarkRehype).use(rehypeStringify);
  test('Compile title', async () => {
    const mdContent = '# 123';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot('"<h1>123</h1>"');
  });
  test('Compile context', async () => {
    const mdContent = '# 123`let i = 0;`';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot(
      '"<h1>123<code>let i = 0;</code></h1>"'
    );
  });
});
