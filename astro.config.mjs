import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
const defaultMarkdownLayout = () => {
  return function (_, file) {
    file.data.astro.frontmatter.layout = file.data.astro.frontmatter.layout || "../../../layouts/MarkdownLayout.astro";
  };
};


// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), react(), svelte()],
  markdown: {
    remarkPlugins: [defaultMarkdownLayout],
    shikiConfig: {
      theme: 'monokai'
    }
  }
});