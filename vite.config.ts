/// <reference types="vitest" />
/// <reference types="vite/client" />

import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [solid(), tsconfigPaths()],
  server: {
    hmr: {
      overlay: false,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // transformMode: {
    //   web: [/.[jt]sx?/],
    // },
    deps: {
      inline: [/solid-start/, /solid-testing-library/],
    },
  },
});
