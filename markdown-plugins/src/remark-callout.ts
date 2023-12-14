import { visit } from "unist-util-visit";
import { Plugin, Transformer } from "unified";
import { Root } from "mdast";
import { h } from "hastscript";

const remarkCallout: Plugin<[], Root> = () => {
	const transform: Transformer<Root> = (tree) => {
		visit(tree, (node: any) => {
			if (node.type !== "containerDirective") return;
			if (node.name !== "callout") return;

			const data = node.data || (node.data = {});

			data.hName = "div";
			const attr = (node.attributes || {}) && {
				class: (node.attributes.class || "") + " callout",
				"data-title": node.attributes.t || undefined
			};
			data.hProperties = h("div", attr).properties;
		});
	};

	return transform;
};

export default remarkCallout;
