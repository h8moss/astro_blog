import { visit } from "unist-util-visit";
import { Plugin, Transformer } from "unified";
import type { Root, Code } from "mdast";

const getLangAndTitle = (
	node: Code
): [string | undefined, string | undefined] => {
	const meta = node.meta;
	let lang = node.lang;

	if (!lang) {
		return [undefined, undefined];
	}

	let title = lang;
	let fullLang = lang;

	if (meta) {
		fullLang += " " + meta;
		node.meta = null;
	}

	if (fullLang.includes("[") && fullLang.includes("]")) {
		const openingIndex = fullLang.indexOf("[");
		const closingIndex = fullLang.indexOf("]");
		title = fullLang.substring(openingIndex + 1, closingIndex);
		lang = fullLang.substring(0, openingIndex);
	}

	return [lang, title];
};

/**
Allows for the following syntax:
````md
```js[my code]
let someCode = 100;
```
````
To add a `data-title="my code"` attribute to the code html code block
 */
const remarkCodeDataTitles: Plugin<[], Root> = () => {
	const transform: Transformer<Root> = (tree) => {
		visit(tree, "code", (node) => {
			const data = node.data || ((node.data = {}) as any);
			const properties = data.hProperties || (data.hProperties = {});

			const [lang, title] = getLangAndTitle(node);

			if (!lang || !title) return;

			properties["data-title"] = title;
			node.lang = lang;
		});
	};

	return transform;
};

export default remarkCodeDataTitles;
