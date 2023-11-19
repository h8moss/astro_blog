import { visit } from "unist-util-visit";
import { Plugin, Transformer } from "unified";
import type { Root } from "hast";
import { h } from "hastscript";

const rehypeCopyCodeButton: Plugin<[], Root> = () => {
	const transform: Transformer<Root> = (tree) => {
		visit(tree, { tagName: "pre" }, (node) => {
			node.children = [
				...node.children,
				h(
					"button",
					{
						class: "copy-button"
					},
					"Copy"
				)
			];
		});
	};

	return transform;
};

export default rehypeCopyCodeButton;
