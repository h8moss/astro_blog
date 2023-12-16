import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import remarkCodeDataTitles from "../src/remark-code-data-titles.js";
import { remark } from "remark";
import logger from "./logger.js";
import rehypeCodeAddTitles from "../src/rehype-code-add-titles.js";
import remarkAddMissingCodeTitles from "../src/remark-add-missing-code-titles.js";
import rehypeHeadingIds from "../src/rehype-heading-ids.js";
import rehypeCopyCodeButton from "../src/rehype-copy-code-button.js";
import remarkDirective from "remark-directive";
import remarkCallout from "../src/remark-callout.js";

const text = `
# hello world

\`\`\`js
let x = 100;
\`\`\`

\`\`\`ts
let x = 100;
\`\`\` 
# Hello h1
## Hello h2
### Hello h2

:::callout[xdd]{.red}
Lorem:br
ipsum.
:::
`;

const file = await remark()
	.use(remarkDirective)
	.use(remarkCodeDataTitles)
	.use(remarkAddMissingCodeTitles)
	.use([logger])
	.use(remarkCallout)
	.use(remarkRehype)
	.use(rehypeCodeAddTitles)
	.use(rehypeStringify)
	.use(rehypeCopyCodeButton)
	.use(rehypeHeadingIds, { materialIcon: "lmaoxd" })
	.process(text);

console.log(text);
console.log("------");
console.log(String(file));
