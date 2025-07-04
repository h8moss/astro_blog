import { visit } from "unist-util-visit";
import { Plugin, Transformer } from "unified";
import type { Root } from "hast";
import { h } from "hastscript";

/**
 * Adds a button.copy-button element as child of all pre elements
 * The button does nothing by default and must be listened to with Javascript
 */
export default function rehypeCopyCodeButton() {
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
