/// <reference types="mdast-util-directive" />
import { visit } from "unist-util-visit";
import { Plugin, Transformer } from "unified";
import { Root } from "mdast";
import { h } from "hastscript";

interface Props {
  materialIcon: string;
  materialClass?: string;
}

/**
 * Allows for file download using the following syntax:
 * ```md
 * ::file{t="Some file.txt" p="/public/some-file.txt"}
 * ```
 * @param Props is an object with the following props:
 * * `materialIcon` The name of the [Material Icon](https://fonts.google.com/icons) to add as a child
 * * `materialClass` The name of the material icon class, default is "material-symbols-outlined"
 */
export default function remarkDownloadFile({
  materialIcon,
  materialClass = "material-symbols-outlined"
}: Props) {
  const transform: Transformer<Root> = (tree) => {
    visit(tree, "leafDirective", (node) => {
      if (node.name !== "file") return;

      const attributes = node.attributes || (node.attributes = {});
      const data = node.data || (node.data = {});

      const { p: path, t: title } = attributes;

      data.hName = "button";
      data.hProperties = { class: "file-download", "data-path": path };
      data.hChildren = [
        h("span", { class: materialClass }, materialIcon),
        h("p", title)
      ];
    });
  };

  return transform;
};

