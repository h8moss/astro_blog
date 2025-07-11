import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import {
  remarkCodeDataTitles,
  remarkAddMissingCodeTitles,
  remarkCallout,
  remarkDownloadFile,
  rehypeCodeAddTitles,
  rehypeHeadingIds,
  rehypeCopyCodeButton
} from 'markdown-plugins';
import remarkDirective from 'remark-directive';
import rehypeShiki from 'rehype-shiki'

const defaultMarkdownLayout = () => {
  return function(_, file) {
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
      [remarkDownloadFile, { materialIcon: 'file_save' }]
    ],
    rehypePlugins: [
      rehypeCodeAddTitles,
      [rehypeHeadingIds, { materialIcon: 'link' }],
      // Add custom syntax highlighting
      [rehypeShiki, { useBackground: false, theme: 'monokai' }],
      rehypeCopyCodeButton
    ],
    syntaxHighlight: false // Astro's syntax highlight kills rehypeCodeAddTitles
  },
  vite: {
    resolve: {
      preserveSymlinks: true,
    },
    ssr: {
      noExternal: ['markdown-plugins']
    }
  },
  build: {
    format: "file"
  }
});
