import { visit } from "unist-util-visit";
import { Plugin, Transformer } from "unified";
import { is } from "unist-util-is";
import { visitParents } from "unist-util-visit-parents";
import type { Root } from "mdast";

const logger: Plugin<[string | undefined], Root> = (test = undefined) => {
  const transform: Transformer<Root> = (tree) => {
    visitParents(tree, (node, ancestors) => {
      if (test && !is(node, test)) return;

      let data = node.data || (node.data = {});

      let properties = data.hProperties || (data.hProperties = {});
    });
  };

  return transform;
};

export default logger;
