
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkCodeDataTitles from '../src/remark-code-data-titles.js'
import {remark} from 'remark';
import logger from './logger.js'

const text = `
# hello world

\`\`\`js[my nice code]
let x = 100;
\`\`\`
`;

const file = await remark()
  .use(remarkCodeDataTitles)
  .use(remarkRehype)
  .use([logger])
  .use(rehypeStringify)
  .process(text)

console.log(text)
console.log('------')
console.log(String(file))
