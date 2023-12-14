import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import {
  remarkCodeDataTitles,
  remarkAddMissingCodeTitles,
  remarkCallout,
  rehypeCodeAddTitles,
  rehypeHeadingIds,
  rehypeCopyCodeButton
} from 'markdown-plugins'
import rehypeShiki from 'rehype-shiki';
import remarkDirective from 'remark-directive';

const defaultMarkdownLayout = () => {
  return function (_, file) {
    file.data.astro.frontmatter.layout =
      file.data.astro.frontmatter.layout
      || "../../../layouts/MarkdownLayout.astro";
  };
};

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), react(), svelte()],
  markdown: {
    remarkPlugins: [
      defaultMarkdownLayout,
      remarkDirective,
      remarkCallout,
      remarkCodeDataTitles,
      remarkAddMissingCodeTitles,
    ],
    rehypePlugins: [
      rehypeCodeAddTitles,
      [rehypeHeadingIds, { anchorImgSrc: '/link.png', anchorImgSize: 40 }],
      [rehypeShiki, {
        useBackground: false,
        theme: 'monokai'
      }], // Add custom syntax highlighting
      rehypeCopyCodeButton
    ],
    syntaxHighlight: false, // Astro's syntax highlight kills rehypeCodeAddTitles
  }
});