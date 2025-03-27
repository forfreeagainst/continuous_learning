# esbuild(开发环境)

```md
esbuild.context({
  entryPoints: [entry], //入口
  outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`), //出口
  bundle: true, // reactivity -> shared 会打包到一起
  platform: "browser", //打包给浏览器使用
  sourcemap: true, //可以调试源代码
  format,
  globalName: pkg.buildOptions?.name
}).then(ctx => {
  console.log("start dev");
  return ctx.watch();//监控入口文件持续进行打包处理
})
```
