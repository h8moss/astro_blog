/// <reference types="mdast-util-directive" />
import { visit } from "unist-util-visit";
import { Plugin, Transformer } from "unified";
import { Root } from "mdast";
import { h } from "hastscript";

/**
 * Adds support for callouts in markdown using the following syntax:
 * ```md
 * :::callout
 * Some text here whatever lmao
 * :::
 * ```
 */
export default function remarkCallout() {
  const transform: Transformer<Root> = (tree) => {
    visit(tree, (node) => {
      if (node.type !== "containerDirective") return;
      if (node.name !== "callout") return;

      const data = node.data || (node.data = {});

      data.hName = "div";
      const attr = (node.attributes || {}) && {
        class: (node.attributes?.class || "") + " callout",
        "data-title": node.attributes?.t || undefined
      };
      data.hProperties = h("div", attr).properties;
    });
  };

  return transform;
};

