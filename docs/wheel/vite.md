# Vite

AutoImport（）: 自动帮我们导入，useRouter,useI18n, 等

## 官网

### 为什么选择Vite

官网说的挺好的。

## 构建生产版本

### 自定义构建

构建过程可以通过多种 构建配置选项 来自定义构建。具体来说，你可以通过 build.rollupOptions 直接调整底层的 Rollup 选项

```vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/configuration-options/
    },
  },
})
```

## 部署

```md
npmjs.com的serve：可以把打包后的东西部署到本地，适用于开发环境。生产环境使用Vercel
serve -s dist(打包后的路径)
serve -s dist -p 10007 修改端口号，部署到本地
```
