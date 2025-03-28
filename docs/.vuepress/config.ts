import { defineConfig4CustomTheme, UserPlugins } from "vuepress/config";

export default defineConfig4CustomTheme({
  locales: {
    "/": {
      lang: "zh-CN",
      title: "时空随笔",
      description: "用时间换空间，用空间换时间",
    },
  },
  base: "/continuous_learning/",
  themeConfig: {
    nav: [
      { text: "首页", link: "/index.md" },
      {
        //导航栏和侧边栏的字段属性不一样
        text: "开发",
        items: [
          { text: "HTML", link: "/develop/html.md" },
          { text: "Css", link: "/develop/css.md" },
          { text: "JavaScript", link: "/develop/javascript.md" },
          { text: "js的超集ts", link : "/develop/typescript.md"},
          { text: "node.js", link: "/develop/node.js.md" },
          { text: "bash脚本", link: "/develop/bash.md" },
          { text: "设计模式与数据结构", link: "/develop/solid.md" }
        ],
      },
      {
        text: "轮子",
        items: [
          { text: 'vue', link: "/wheel/vue.md" },
          {text: "Vue生态", link:"/wheel/vue_ecology"},
          { text: 'react', link: "/wheel/react.md" },
          { text: 'vue2项目', link: "/wheel/vue2_project.md"},
          { text: "脚手架", link: "/wheel/cli.md" },
          { text: "测试工具", link: "/wheel/test_tool.md" },
        ]
      },
      {
        text: '构建工具',
        items: [
          {text: "esbuild", link: "/pack/esbuild.md"},
          {text: "webpack", link: "/pack/webpack.md"},
          {text: "vite", link: "/pack/vite.md"},
          {text: "rollup", link: "/pack/rollup.md"},
        ]
      },
      {
        text: "面试",
        items: [
          {text: "技术类", link: "/interview/technology.md"},
          {text: "闲谈", link: "/interview/chat.md"},
          { text: "手写题", link: "/interview/handwriting.md" },
          { text: "算法题1", link: "/interview/algorithmOne.md" },
          { text: "算法题2", link: "/interview/algorithmTwo.md" },
        ]
      },
      {
        text: 'AI',
        items: [
          {text: "问答", link: "/AI/QA.md"},
        ]
      },
      {
        text: "工作经历",
        items: [
          {text: "千分符金额文本框组件", link: "/job_experience/ThousandSeparatorAmoutInput.md"}
        ]
      }
    ],
    sidebar: [
      {
        title: "开发",
        children: [
          { title: "HTML", path: "/develop/html.md" },
          { title: "Css", path: "/develop/css.md" },
          { title: "JavaScript", path: "/develop/javascript.md" },
          { title: "js的超集ts", path : "/develop/typescript.md"},
          { title: "node.js", path: "/develop/node.js.md" },
          { title: "bash脚本", path: "/develop/bash.md" },
          { title: "设计模式与数据结构", path: "/develop/solid.md" }
        ],
      },
      {
        title: "轮子",
        children: [
          { title: 'vue', path: "/wheel/vue.md" },
          {title: "Vue生态", path:"/wheel/vue_ecology"},
          { title: 'react', path: "/wheel/react.md" },
          { title: 'vue2项目', path: "/wheel/vue2_project.md"},
          { title: "脚手架", path: "/wheel/cli.md" },
          { title: "测试工具", path: "/wheel/test_tool.md" },
        ]
      },
      {
        title: "构建工具",
        children: [
          { title: "esbuild", path: "/pack/esbuild.md" },
          { title: "webpack", path: "/pack/webpack.md" },
          { title: "vite", path: "/pack/vite.md"},
          { title: "rollup", path: "/pack/rollup.md"},
        ]
      },
      {
        title: "面试",
        children: [
          {title: "技术类", path: "/interview/technology.md"},
          {title: "闲谈", path: "/interview/chat.md"},
          { title: "手写题", path: "/interview/handwriting.md" },
          { title: "算法题1", path: "/interview/algorithmOne.md" },
          { title: "算法题2", path: "/interview/algorithmTwo.md" },
        ]
      },
      {
        title: 'AI',
        children: [
          {title: "问答", path: "/AI/QA.md"},
        ]
      },
      {
        title: "工作经历",
        children: [
          {title: "千分符金额文本框组件", path: "/job_experience/ThousandSeparatorAmoutInput.md"}
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
