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
          { text: "HTML和CSS", link: "/develop/HTMLAndCSS.md" },
          { text: "JavaScript", link: "/develop/javascript.md" },
          { text: "TypeScript", link : "/develop/typescript.md"},
          { text: "node.js", link: "/develop/node.js.md" },
          { text: "设计模式与数据结构", link: "/develop/solid.md" },
          { text: "EnglishVariable", link: "/develop/variable.md" },
          { text: "EnglishArticle", link: "/develop/English.md" },
        ],
      },
      {
        text: "轮子",
        items: [
          { text: 'vue语法', link: "/wheel/vue.md" },
          { text: 'vue源码', link: "/wheel/vue_source.md" },
          {text: "Vue生态", link:"/wheel/vue_ecology"},
          { text: 'react语法', link: "/wheel/react.md" },
          { text: 'React源码', link: "/wheel/React_source.md" },
          { text: 'vue基建', link: "/wheel/vueInfrastructure.md"},
          { text: "esbuild", link: "/wheel/esbuild.md" },
          { text: "webpack", link: "/wheel/webpack.md" },
          { text: "vite", link: "/wheel/vite.md"},
          { text: "rollup", link: "/wheel/rollup.md"},
          { text: "测试工具", link: "/wheel/test_tool.md" },
        ]
      },
      {
        text: "面试",
        items: [
          {text: "精华", link: "/interview/EssenceSummary.md"},
          {text: "技术类1", link: "/interview/technologyOne.md"},
          {text: "闲谈", link: "/interview/chat.md"},
          { text: "手写题", link: "/interview/handwriting.md" },
          { text: "算法", link: "/interview/algorithm.md" },
          { text: "算法题1", link: "/interview/algorithmOne.md" },
          { text: "算法题2", link: "/interview/algorithmTwo.md" },
          { text: "AI问答", link: "/interview/QA.md" },
          { text: "AI随便问问", link: "/interview/other.md" },
        ]
      },
      {
        text: "工作经历",
        items: [
          {text: "从Vue2迁移到Vue3", link: "/job_experience/MigratingFromVue2ToVue3.md"},
          {text: "基于Promise调用子组件弹窗", link: "/job_experience/PromiseDialog.md"},
          {text: "权限控制", link: "/job_experience/permission.md"},
          {text: "性能优化", link: "/job_experience/PerformanceOptimization.md"},
          {text: "国际化", link: "/job_experience/I18n.md"},
          {text: "动态表单", link: "/job_experience/DynamicForm.md"},
          {text: "脚手架", link: "/job_experience/cli.md" },
          {text: "大文件上传", link: "/job_experience/FileUpload.md" },
          {text: "低代码", link: "/job_experience/LowCode.md"},
          {text: "Echarts图表", link: "/job_experience/EchartsHook.md"},
          {text: "可排序的", link: "/job_experience/sortable.md"},
          {text: "sdk前端埋点", link: "/job_experience/sdk.md"},
          {text: "持续集成持续部署", link: "/job_experience/CICD.md"},
          {text: "配置式Provider", link: "/job_experience/ConfigProvider.md"},
          {text: "虚拟滚动", link: "/job_experience/VirtualScrolling.md"},
          {text: "千分符金额文本框组件", link: "/job_experience/ThousandSeparatorAmoutInput.md"},
          {text: "WebSocket", link: "/job_experience/WebSocket.md"},
          {text: "SEO", link: "/job_experience/seo.md"},
          { text: "大屏", link: "/job_experience/largeScreen.md"},
          { text: "前端安全", link: "/job_experience/safe.md"},
          { text: "单点登录", link: "/job_experience/singleSignOn.md"},
          {text: "视频合成", link: "/job_experience/video_merger.md"},
          {text: "音乐软件", link: "/job_experience/music_soft.md"},
        ]
      }
    ],
    sidebar: [
      {
        title: "开发",
        children: [
          { title: "HTML和CSS", path: "/develop/HTMLAndCSS.md" },
          { title: "JavaScript", path: "/develop/javascript.md" },
          { title: "TypeScript", path : "/develop/typescript.md"},
          { title: "node.js", path: "/develop/node.js.md" },
          { title: "设计模式与数据结构", path: "/develop/solid.md" },
          { title: "EnglishVariable", path: "/develop/variable.md" },
          { title: "EnglishArticle", path: "/develop/English.md" },
        ],
      },
      {
        title: "轮子",
        children: [
          { title: 'vue语法', path: "/wheel/vue.md" },
          { title: "vue源码", path: "/wheel/vue_source.md"},
          {title: "Vue生态", path:"/wheel/vue_ecology"},
          { title: 'react语法', path: "/wheel/react.md" },
          { title: 'React源码', path: "/wheel/React_source.md" },
          { title: 'vue基建', path: "/wheel/vueInfrastructure.md"},
          { title: "esbuild", path: "/wheel/esbuild.md" },
          { title: "webpack", path: "/wheel/webpack.md" },
          { title: "vite", path: "/wheel/vite.md"},
          { title: "rollup", path: "/wheel/rollup.md"},
          { title: "测试工具", path: "/wheel/test_tool.md" },
        ]
      },
      {
        title: "面试",
        children: [
          {title: "精华", path: "/interview/EssenceSummary.md"},
          {title: "技术类1", path: "/interview/technologyOne.md"},
          {title: "闲谈", path: "/interview/chat.md"},
          { title: "手写题", path: "/interview/handwriting.md" },
          { title: "算法", path: "/interview/algorithm.md" },
          { title: "算法题1", path: "/interview/algorithmOne.md" },
          { title: "算法题2", path: "/interview/algorithmTwo.md" },
          { title: "AI问答", path: "/interview/QA.md" },
          { title: "AI随便问问", path: "/interview/other.md" },
        ]
      },
      {
        title: "工作经历",
        children: [
          {title: "从Vue2迁移到Vue3", path: "/job_experience/MigratingFromVue2ToVue3.md"},
          {title: "基于Promise调用子组件弹窗", path: "/job_experience/PromiseDialog.md"},
          {title: "权限控制", path: "/job_experience/permission.md"},
          {title: "性能优化", path: "/job_experience/PerformanceOptimization.md"},
          {title: "国际化", path: "/job_experience/I18n.md"},
          {title: "动态表单", path: "/job_experience/DynamicForm.md"},
          {title: "脚手架", path: "/job_experience/cli.md" },
          {title: "大文件上传", path: "/job_experience/FileUpload.md" },
          {title: "低代码", path: "/job_experience/LowCode.md"},
          {title: "Echarts图表", path: "/job_experience/EchartsHook.md"},
          {title: "可排序的", path: "/job_experience/sortable.md"},
          {title: "sdk前端埋点", path: "/job_experience/sdk.md"},
          {title: "持续集成持续部署", path: "/job_experience/CICD.md"},
          {title: "配置式Provider", path: "/job_experience/ConfigProvider.md"},
          {title: "虚拟滚动", path: "/job_experience/VirtualScrolling.md"},
          {title: "千分符金额文本框组件", path: "/job_experience/ThousandSeparatorAmoutInput.md"},
          {title: "WebSocket", path: "/job_experience/WebSocket.md"},
          {title: "SEO", path: "/job_experience/seo.md"},
          { title: "大屏", path: "/job_experience/largeScreen.md"},
          { title: "前端安全", path: "/job_experience/safe.md"},
          { title: "单点登录", path: "/job_experience/singleSignOn.md"},
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
