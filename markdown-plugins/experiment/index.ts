import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import remarkCodeDataTitles from "../src/remark-code-data-titles.js";
import { remark } from "remark";
import logger from "./logger.js";
import rehypeCodeAddTitles from "../src/rehype-code-add-titles.js";
import remarkAddMissingCodeTitles from "../src/remark-add-missing-code-titles.js";

const text = `
# hello world

\`\`\`js
let x = 100;
\`\`\`

\`\`\`ts
let x = 100;
\`\`\` `;

const file = await remark()
	.use(remarkCodeDataTitles)
	.use(remarkAddMissingCodeTitles)
	.use(remarkRehype)
	.use([logger])
	.use(rehypeCodeAddTitles)
	.use(rehypeStringify)
	.process(text);

console.log(text);
console.log("------");
console.log(String(file));
