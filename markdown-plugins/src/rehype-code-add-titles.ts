import { visit, SKIP } from "unist-util-visit";
import { Plugin, Transformer } from "unified";
import type { Root, Element } from "hast";
import { h } from "hastscript";

/**
Turns all 
```html
<pre>
<code data-title="title">code</code>
</pre>
```
blocks into
```html
<pre>
<div>
  <p class="title">title</p>
  <code>code</code>
</div>
</pre>
```
*/
export default function rehypeCodeAddTitles() {
  const transform: Transformer<Root> = (tree) => {
    visit(tree, { tagName: "pre" }, (node) => {
      const child = node.children.find((child) => child.type === "element") as
        | Element
        | undefined;

      if (!child) return;

      const properties = node.properties || (node.properties = {});
      const childProperties = child.properties || (child.properties = {});

      const title = childProperties["data-title"] || childProperties.dataTitle; // I dont know why, but in astro it gets translated to dataTitle

      if (!title || typeof title !== "string") return;

      node.tagName = "div";
      properties["class"] = "code-container";
      node.children = [h("p", title), h("pre", child)];

      return SKIP; // To avoid going into an infinite loop
    });
  };

  return transform;
};

