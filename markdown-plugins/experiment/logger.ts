import { visit } from "unist-util-visit";
import { Plugin, Transformer } from "unified";
import type { Root } from "remark-directive/lib";
import { is } from "unist-util-is";
import { visitParents } from "unist-util-visit-parents";

const logger: Plugin<[string|undefined], Root> = (test=undefined) => 
{

  const transform: Transformer<Root> = (tree) => {
    visitParents(tree, (node, ancestors) => {
      if (test && !is(node, test)) return;
      
      let data = node.data || (node.data = {})

      let properties = data.hProperties || (data.hProperties = {});

      console.log({node, properties, data, ancestors});

    })
  };

  return transform;
};

export default logger;