
# 千分符金额文本框组件

## 测试案例

* 用户所看千分符分割的金额，但表单数据为无千分符分割的金额。
* 是文本输入框。
* 不能输入字符串、错误的金额格式


## 开发思路

* 外部父组件值变化（初始值，驳回后一键复制数据），子组件也要更新。
* 子组件的input，也要更新父组件的值。
* blur事件，修改文本框的值，但input事件不会再触发了。（h5也一样）
* v-model是 :value 和 @input 的语法糖。

## 代码实现

### 父组件

```vue
<template>
    <div>
      <ThousandSeparatorInput v-model="amount" />
      <!--v-model其实是 :value和 @input的 语法糖-->
      <p>实际值: {{ amount }}</p>
    </div>
  </template>
  
  <script>
    import { ref } from 'vue';
    import ThousandSeparatorInput from '../components/FormatAmt.vue';
    
    export default {
        components: {
        ThousandSeparatorInput
        },
        setup() {
        const amount = ref(undefined);
        return {
            amount
        };
        }
    };
</script>
```

### 子组件

```vue
<template>
    <input
      type="text"
      @focus="handleFocus"
      v-model="displayValue"
      @input="handleInput"
      @blur="handleBlur"
    />
  </template>
  
  <script>
  // 思路：父组件传值给子组件，子组件要变化。子组件input后，父组件的值也要变化。
  // 重点：blur事件修改文本框的值，文本框的值会变化，但input事件不再执行了。(h5也一样)
  import { ref, watch } from 'vue';
  
  export default {
    name: 'ThousandSeparatorInput',
    props: {
      modelValue: {
        type: [String, Number],
        default: ''
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const displayValue = ref(formatWithThousandSeparator(props.modelValue));
  
      // 监听外部传入的 modelValue 变化
      watch(() => props.modelValue, (newValue) => {
        displayValue.value = newValue;
      });
  
      // 格式化金额，添加千分符
      function formatWithThousandSeparator(value) {
        if (!value) return '';
        const num = parseFloat(value.toString().replace(/,/g, ''));
        return isNaN(num) ? '' : num.toLocaleString();
      }
  
      // 去除千分符，返回纯数字
      function removeThousandSeparator(value) {
        if (value.endsWith('.')) {
          value = value.slice(0, -1);
        }
        return value.toString().replace(/,/g, '');
      }
  
      // 处理焦点事件
      function handleFocus(event) {
        displayValue.value = removeThousandSeparator(displayValue.value);
      }
      // 处理输入事件
      function handleInput(event) {
        const regex = /^\d*(\.\d{0,2})?$/;
        let value = event.target.value;
        if (!regex.test(value)) {
            value = value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1').replace(/^(\d+\.\d{2}).*$/, '$1');
        }
  
        if (value.slice(0, 1) === '.') {
          value = `0${value}`;
        }
  
        // 交互一：乱输入：直接变为0
        // value = !regex.test(value) ? '0': value;
        // 交互二：只允许数字和小数点
        // value = value.replace(/[^0-9.]/g, '');
  
        // 限制小数点后最多两位
        // if (value.includes('.')) {
        //   const parts = value.split('.');
        //   if (parts[1].length > 2) {
        //     value = parts[0] + '.' + parts[1].slice(0, 2);
        //   }
        // }
  
        // 限制总长度不超过13位（包括小数点）
        if (value.replace('.', '').length > 13) {
          value = value.slice(0, 13 + (value.includes('.') ? 1 : 0));
        }
  
        displayValue.value = value;
        emit('update:modelValue', removeThousandSeparator(value));
      }
  
      // 处理失去焦点事件，确保显示的值是格式化后的
      function handleBlur() {
        displayValue.value = formatWithThousandSeparator(displayValue.value);
      }
  
      return {
        handleFocus,
        displayValue,
        handleInput,
        handleBlur
      };
    }
  };
</script>
```

### temp

```js
// 格式化金额
function formatCurrency(number) {
  // 将数字转换为字符串并去除小数点
  const numberStr = number.toFixed(2).replace('.', '');
  // 使用正则表达式每三个数字分隔
  const formatted = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // 将字符串重新加上小数点
  return formatted.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
// 使用示例
console.log(formatCurrency(1234567.89)); // 输出: 1,234,567.89
```