# Vite

## 指引

### 构建生产版本

#### 自定义构建

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

