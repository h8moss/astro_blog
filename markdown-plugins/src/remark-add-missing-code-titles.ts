import { visit } from "unist-util-visit";
import { Plugin, Transformer } from "unified";
import type { Root } from "mdast";
import langsIndex from "../public/langs-index.json" assert { type: "json" };

/**
Finds all codeblocks with no title or title equal to language and adds a
human-readable interpretation of the language as the title. Example

js => JavaScript
cpp => C++
 */
const remarkAddMissingCodeTitles: Plugin<[], Root> = () => {
	const transform: Transformer<Root> = (tree) => {
		visit(tree, "code", (node) => {
			const data = node.data || ((node.data = {}) as any);
			const properties = data.hProperties || (data.hProperties = {});

			const lang = node.lang;
			const title = properties["data-title"];

			if (lang && (lang === title || (lang && !title))) {
				if (lang in langsIndex) {
					properties["data-title"] =
						langsIndex[lang as keyof typeof langsIndex];
				}
			}
		});
	};

	return transform;
};

export default remarkAddMissingCodeTitles;
