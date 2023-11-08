import { visit } from "unist-util-visit";
import { Plugin, Transformer } from "unified";
import type { Root } from "remark-directive/lib";

const rehypeCodeAddTitles: Plugin<[], Root> = () => {
	const transform: Transformer<Root> = (tree) => {
		visit(tree, "code", (node) => {
			const data = node.data || (node.data = {});
			const properties = data.hProperties || (data.hProperties = {});

			// TODO Implement this
		});
	};

	return transform;
};

export default rehypeCodeAddTitles;
