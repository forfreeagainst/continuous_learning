# 虚拟滚动

vue-virtual-scroller (vue的h用途，mitt、vue-observe-visibility、vue-resize配合使用，) 
退而求其次，把b站那个虚拟滚动的代码摘录了。

## 核心思想

动态渲染：只渲染可视区域（Viewport）内的数据。
DOM 复用：滚动时复用已存在的 DOM 节点，仅更新内容。

## 使用场景

* 超过 1,000 条数据的表格/列表。
* 对滚动流畅性要求高的场景（如移动端）。
* 需要高频更新的实时数据展示。

## 检验

* 防抖函数不够合理，requestAnimationFrame
* 缓冲区，快速滑动有留白
* transform: translateY 或者  top
* scrollTo精确滚动
* :key="item.id"
* Performance 绘画帧，检验性能。在Chrome DevTools的Performance面板中检查滚动时的FPS是否稳定在60左右
* 打开F12，观察DOM元素的变化
* 向下滚动时用 Math.ceil：这会使得 start 跳跃式增加（比如从 10.1 → 11），导致渲染区域突然跳变，可能触发反向滚动，形成死循环。无论向上，还是向下，都使用Math.floor就好了。

## 初始版本

```js
<script setup lang="ts">
interface ListItem {
  id: string,
  name: string
}
import {onMounted, ref, computed} from 'vue';
const allListData = ref<ListItem[]>([]); // 所有的数据，比如这个数组存放了十万条数据
const itemHeight =  ref(50) // 每一条（项）的高度，比如40像素
const count =  ref(10); // 一屏展示几条数据
const buffer = ref(10); // 高频滚动的留白
const start = ref(0);
const end = ref(10)
const topVal = ref<string>('0')
const loading = ref(false);

const showListData = computed(() => {
    return allListData.value.slice(
      Math.max(0, start.value - buffer.value),
      Math.min(allListData.value.length, end.value + buffer.value)
    )
})

//当用户滚动列表时，期望内容 实时跟随滚动位置变化（即使略有延迟），而不是等到滚动停止才突然刷新。
// 如果使用防抖，用户在快速滚动时会看到 长时间空白（因为更新被延迟到滚动停止后），体验极差。
const virtualListWrap = ref()
const throttle = (fn: () => void, delay = 300) => {
  let ticking = false;
  return function(this: any, ...args: any[]) {
    if (!ticking) {
      requestAnimationFrame(() => {
        fn.apply(this);
        ticking = false;
      });
      ticking = true;
    }
  };
  // let prev = 0;
  // return function() {
  //   let now = new Date().getTime();
  //   if (now - prev > delay) {
  //     fn();
  //     prev = new Date().getTime();
  //   }
  // }
}

const scrollEvent = () => {
  const scrollTop = virtualListWrap.value.scrollTop;
  start.value =  Math.floor(scrollTop/itemHeight.value)
  end.value = start.value + count.value
  // 滚动的位置
  const scrollPosition = start.value * itemHeight.value
  topVal.value = `translateY(${scrollPosition}px)`
  // 如果向上滑动，就抹平，否则就取整
  virtualListWrap.value.scrollTo({top: scrollPosition, behavior: 'smooth'})
  // topVal.value = virtualListWrap.value.scrollTop + 'px'
}

const handleScroll = throttle(scrollEvent, 300);

onMounted(() => {
    loading.value = true
    let temp: any[] = [];
    for(let i = 0; i < 1000; i++ ) {
        temp.push({name: `durant${i}${i}${i}${i}${i}`, id: Math.random()})
    }
    allListData.value = temp;
    loading.value = false
})
</script>

<template>
      <div
    class="virtualListWrap"
    ref="virtualListWrap"
    :style="{ height: itemHeight * count + 'px' }"
    @scroll="handleScroll"
  >
    <!--可弄骨架屏-->
    <div
      class="placeholderDom"
      :style="{ height: allListData.length * itemHeight + 'px' }"
    >
      骨架屏
    </div>
    <div class="contentList" :style="{ transform: topVal }">
      <!-- 每一条（项）数据 -->
      <div
        v-for="(item, index) in showListData"
        :key="item.id"
        class="itemClass"
        :style="{ height: itemHeight + 'px' }"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="loadingBox" v-show="loading">
      <i class="el-icon-loading"></i>
      &nbsp;&nbsp;<span>loading...</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 虚拟列表容器盒子
.virtualListWrap {
  box-sizing: border-box;
  width: 240px;
  border: solid 1px #000000;
  // 开启滚动条
  overflow-y: auto;
  // 开启相对定位
  position: relative;
  .contentList {
    width: 100%;
    // height: auto;
    // 搭配使用绝对定位
    position: absolute;
    top: 0;
    left: 0;
    .itemClass {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    // 奇偶行改一个颜色
    .itemClass:nth-child(even) {
      background: #c7edcc;
    }
    .itemClass:nth-child(odd) {
      background: pink;
    }
  }
  .loadingBox {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.64);
    color: green;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
```