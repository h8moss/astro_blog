import { SKIP, visit } from "unist-util-visit";
import { Plugin, Transformer } from "unified";
import type { Root, Node, Element } from "hast";
import { toString } from "hast-util-to-string";
import { h } from "hastscript";

interface Props {
	anchorImgSrc: string;
	anchorImgSize?: number;
}

const isHeading = (node: Node) => {
	if (node.type !== "element") return false;

	const element = node as Element;
	return ["h1", "h2", "h3", "h4", "h5", "h6"].includes(element.tagName);
};

const intoID = (text: string) => {
	let id = text;

	if (/^\d.*$/.test(id)) {
		id = "-" + id;
	}
	id = id.toLowerCase();
	while (id.indexOf(" ") !== -1) {
		id = id.replace(" ", "-");
	}
	return id;
};

/**
 * Adds an anchor element with an image and an href to this element's id
 * @param parameter The only parameter passed is an object with the following keys:
 * * `anchorImgSrc: string`, the source of the image inside the anchor
 * * `anchorImgSize: number`, the size of the image inside the anchor
 */
const rehypeHeadingIds: Plugin<[Props], Root> = ({
	anchorImgSrc,
	anchorImgSize = 16
}) => {
	const transform: Transformer<Root> = (tree) => {
		visit(tree, isHeading, (node) => {
			const element = node as Element;

			let id = "";
			if (!element.properties.id) {
				const content = toString(element);
				const contentId = intoID(content);
				id = contentId;
			} else {
				id = element.properties.id as string;
			}

			element.children = [
				h(
					"a",
					{ href: `#${id}` },
					h("img", {
						src: anchorImgSrc,
						width: anchorImgSize,
						height: anchorImgSize
					})
				),
				h(element.tagName, element.children)
			];

			element.properties = { id, class: "heading-div" };
			element.tagName = "div";

			return SKIP;
		});
	};

	return transform;
};

export default rehypeHeadingIds;
