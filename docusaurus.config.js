// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import { readFileSync } from 'fs';
const pkgJson = JSON.parse(readFileSync('./package.json', { encoding: 'utf8' }));

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BC API Docs',
  tagline: 'typedocs for BC generated from bc-stubs',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://bc-typedoc.vercel.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  plugins: [
    'vercel-analytics',
    [
      'docusaurus-plugin-typedoc-api',
      {
        gitRefName: pkgJson.dependencies["bc-stubs"].replace('^', 'v'),
        typedocOptions: { excludeExternals: false, emit: 'none' },
        projectRoot: './apibuild/',
        packages: [{ path: '../node_modules/bc-stubs/', entry: 'bc/' }],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'BC API Docs',
        items: [
          { to: '/api', label: 'BC API', position: 'left' },
          {
            href: 'https://github.com/bananarama92/BC-stubs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
