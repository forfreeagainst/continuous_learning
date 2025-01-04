import { defineConfig4CustomTheme, UserPlugins } from "vuepress/config";

export default defineConfig4CustomTheme({
  locales: {
    "/": {
      lang: "zh-CN",
      title: "修炼心得",
      description: "修炼心得",
    },
  },
  base: "/continuous_learning/",
  themeConfig: {
    nav: [
      { text: "首页", link: "/index.md" },
      {
        //导航栏和侧边栏的字段属性不一样
        text: "前端三剑客",
        items: [
          { text: "HTML", link: "/base/html.md" },
          { text: "Css", link: "/base/css.md" },
          { text: "JavaScript", link: "/base/javascript.md" }
        ],
      },
      {
        text: "笔试",
        items: [
          { text: "手写题", link: "/exam/handwriting.md" },
          { text: "算法题", link: "/exam/algorithm.md" }
        ],
      },
      {
        text: '构建工具',
        items: [
          {text: "esbuild", link: "/pack/esbuild.md"}
        ]
      },
      {
        text: '扩展/爱好',
        items: [
          {text: "node.js", link: "/hobby/node.js.md"}
        ]
      }
    ],
    sidebar: [
      {
        title: "前端三剑客",
        children: [
          { title: "HTML", path: "/base/html.md" },
          { title: "Css", path: "/base/css.md" },
          { title: "JavaScript", path: "/base/javascript.md" }
        ],
      },
      {
        title: "笔试",
        children: [
          { title: "手写题", path: "/exam/handwriting.md" },
          { title: "算法题", path: "/exam/algorithm.md" },
        ],
      },
      {
        title: "构建工具",
        children: [
          {title: "esbuild", path: "/pack/esbuild.md"}
        ]
      },
      {
        title: "扩展/爱好",
        children: [
          {title: "node.js", path: "/hobby/node.js.md"}
        ]
      }
    ],
    logo: "/img/logo.png",
    repo: "forfreeagainst/continuous_learning",
    searchMaxSuggestions: 10,
    docsDir: "docs",
    footer: {
      createYear: 2024,
      copyrightInfo:
        'continuous_learning | <a href="https://github.com/forfreeagainst/continuous_learning" target="_blank">github</a>',
    },
    extendFrontmatter: {
      author: {
        name: "durant",
        link: "https://github.com/forfreeagainst/continuous_learning",
      },
    },
  },
  head: [
    ["link", { rel: "icon", href: "/img/logo.png" }],
    [
      "meta",
      {
        name: "keywords",
        content: "修炼笔记静态资源站点",
      },
    ],
  ],
  plugins: <UserPlugins>[
    [
      "one-click-copy",
      {
        copySelector: [
          'div[class*="language-"] pre',
          'div[class*="aside-code"] aside',
        ],
        copyMessage: "复制成功",
        duration: 1000,
        showInMobile: false,
      },
    ],
    [
      "vuepress-plugin-zooming",
      {
        selector: ".theme-vdoing-content img:not(.no-zoom)",
        options: {
          bgColor: "rgba(0,0,0,0.6)",
        },
      },
    ],
  ],
  extraWatchFiles: [".vuepress/config.ts"],
});
