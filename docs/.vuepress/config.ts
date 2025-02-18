import { defineConfig4CustomTheme, UserPlugins } from "vuepress/config";

export default defineConfig4CustomTheme({
  locales: {
    "/": {
      lang: "zh-CN",
      title: "修炼心得(短目标:2年到武皇癫疯)",
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
          { text: "JavaScript", link: "/base/javascript.md" },
          { text: "js的超集ts", link : "/base/typescript.md"}
        ],
      },
      {
        text: "前端框架",
        items: [
          { text: 'vue', link: "/frame/vue.md" },
          { text: 'react', link: "/frame/react.md" },
          { text: 'vue2项目', link: "/frame/vue2_project.md"}
        ]
      },
      {
        text: "笔试",
        items: [
          { text: "手写题", link: "/exam/handwriting.md" },
          { text: "算法题1", link: "/exam/algorithmOne.md" },
          { text: "算法题2", link: "/exam/algorithmTwo.md" }
        ],
      },
      {
        text: '构建工具',
        items: [
          {text: "esbuild", link: "/pack/esbuild.md"},
          {text: "webpack", link: "/pack/webpack.md"},
          {text: "vite", link: "/pack/vite.md"}
        ]
      },
      {
        text: '扩展',
        items: [
          { text: "node.js", link: "/extend/node.js.md" },
          { text: "脚手架", link: "/extend/cli.md" },
          { text: "面试题目", link: "/extend/interview.md"}
        ]
      },
      {
        text: '爱好',
        items: [
          {text: "English", link: "/hobby/English.md"}
        ]
      }
    ],
    sidebar: [
      {
        title: "前端三剑客",
        children: [
          { title: "HTML", path: "/base/html.md" },
          { title: "Css", path: "/base/css.md" },
          { title: "JavaScript", path: "/base/javascript.md" },
          { title: "js的超集ts", path : "/base/typescript.md"}
        ],
      },
      {
        title: "前端框架",
        children: [
          { title: 'vue', path: "/frame/vue.md" },
          { title: 'react', path: "/frame/react.md" },
          { title: 'vue2项目', path: "/frame/vue2_project.md"}
        ]
      },
      {
        title: "笔试",
        children: [
          { title: "手写题", path: "/exam/handwriting.md" },
          { title: "算法题1", path: "/exam/algorithmOne.md" },
          { title: "算法题2", path: "/exam/algorithmTwo.md" },
        ],
      },
      {
        title: "构建工具",
        children: [
          { title: "esbuild", path: "/pack/esbuild.md" },
          { title: "webpack", path: "/pack/webpack.md" },
          {title: "vite", path: "/pack/vite.md"}
        ]
      },
      {
        title: "扩展",
        children: [
          { title: "node.js", path: "/extend/node.js.md" },
          { title: "脚手架", path: "/extend/cli.md" },
          { title: "面试题", path: "/extend/interview.md" },
        ]
      },
      {
        title: "爱好",
        children: [
          {title: "English", path: "/hobby/English.md"}
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
