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
          { text: "设计模式与数据结构", link: "/develop/solid.md" }
        ],
      },
      {
        text: "轮子",
        items: [
          { text: 'vue', link: "/wheel/vue.md" },
          { text: 'vue源码', link: "/wheel/vue_source.md" },
          {text: "Vue生态", link:"/wheel/vue_ecology"},
          { text: 'react', link: "/wheel/react.md" },
          { text: 'React源码', link: "/wheel/React_source.md" },
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
          {text: "精华", link: "/interview/EssenceSummary.md"},
          {text: "技术类1", link: "/interview/technologyOne.md"},
          {text: "技术类2", link: "/interview/technologyTwo.md"},
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
          {text: "随便问问", link: "/AI/other.md"}
        ]
      },
      {
        text: "工作经历",
        items: [
          {text: "基于Promise调用子组件弹窗", link: "/job_experience/PromiseDialog.md"},
          {text: "可排序的", link: "/job_experience/sortable.md"},
          {text: "sdk前端埋点", link: "/job_experience/sdk.md"},
          {text: "持续集成持续部署", link: "/job_experience/CICD.md"},
          {text: "配置式Provider", link: "/job_experience/ConfigProvider.md"},
          {text: "虚拟滚动", link: "/job_experience/VirtualScrolling.md"},
          {text: "千分符金额文本框组件", link: "/job_experience/ThousandSeparatorAmoutInput.md"},
          {text: "WebSocket", link: "/job_experience/WebSocket.md"},
          {text: "视频合成", link: "/job_experience/video_merger.md"},
          {text: "音乐软件", link: "/job_experience/music_soft.md"},
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
          { title: "设计模式与数据结构", path: "/develop/solid.md" }
        ],
      },
      {
        title: "轮子",
        children: [
          { title: 'vue', path: "/wheel/vue.md" },
          { title: "vue源码", path: "/wheel/vue_source.md"},
          {title: "Vue生态", path:"/wheel/vue_ecology"},
          { title: 'react', path: "/wheel/react.md" },
          { title: 'React源码', path: "/wheel/React_source.md" },
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
          {title: "精华", path: "/interview/EssenceSummary.md"},
          {title: "技术类1", path: "/interview/technologyOne.md"},
          {title: "技术类2", path: "/interview/technologyTwo.md"},
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
          {title: "随便问问", path: "/AI/other.md"}
        ]
      },
      {
        title: "工作经历",
        children: [
          {title: "基于Promise调用子组件弹窗", path: "/job_experience/PromiseDialog.md"},
          {title: "可排序的", path: "/job_experience/sortable.md"},
          {title: "sdk前端埋点", path: "/job_experience/sdk.md"},
          {title: "持续集成持续部署", path: "/job_experience/CICD.md"},
          {title: "配置式Provider", path: "/job_experience/ConfigProvider.md"},
          {title: "虚拟滚动", path: "/job_experience/VirtualScrolling.md"},
          {title: "千分符金额文本框组件", path: "/job_experience/ThousandSeparatorAmoutInput.md"},
          {title: "WebSocket", path: "/job_experience/WebSocket.md"},
          {title: "视频合成", path: "/job_experience/video_merger.md"},
          {title: "音乐软件", path: "/job_experience/music_soft.md"},
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
