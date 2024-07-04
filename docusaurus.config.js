// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import { readFileSync } from 'fs';
const { execSync } = require('node:child_process');
const pkgJson = JSON.parse(readFileSync('./package.json', { encoding: 'utf8' }));

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BC API Docs',
  tagline: 'typedocs for BC ' + pkgJson.dependencies["bc-data"].replace('^', 'v'),
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
        gitRefName: execSync('git rev-parse --short HEAD', { encoding: 'utf8', cwd: 'BondageCollege' }).split('\n')[0],
        projectRoot: './BondageCollege/BondageClub/',
        packages: [
          { path: '.', entry: './' },
        ],
      },
    ],
  ],
  themes: [[
    "@easyops-cn/docusaurus-search-local",
    {
      hashed: true,
      language: ["en"],
      indexPages: true,
      indexBlog: false,
      highlightSearchTermsOnTargetPage: true,
      explicitSearchResultPath: true,
    },
  ]],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'BC API Docs',
        items: [
          { to: '/api', label: 'BC API', position: 'left' },
          { type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'BC data' },
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
