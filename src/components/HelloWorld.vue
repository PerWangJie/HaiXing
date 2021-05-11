<template>
  <div class="hello">
    <el-button type="primary">111</el-button>
    1111
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, reactive } from 'vue';

interface Person {
  name: string;
  age: number;
}

export default defineComponent({
  name: 'HelloWorld',
  props: {
    myarr: {
      type: Array,
      default: () => [],
    }
  },
  setup() {
    // 定义数字
    const num: Ref<number> = ref(1)
    const num2: Ref<number> = ref(3)
    type Gender = 1 | 2
    const boy: Gender = 1
    // 定义字符串
    const message: Ref<string> = ref(`测试`)
    // 定义不知道数据类型
    const unkonw: Ref<any> = ref(`不知道类型`)
    // 定义undefined和null
    const unusable: Ref<void> = ref(undefined) // 只有undefined和null
    // let unusable: void = undefined
    // 定义数组
    const arr: Array<number> = reactive([1, 2, 3])
    const List: Array<any> = reactive([{name: 1, age: 2}, {name: 1, age: 2}, {name: 1, age: 2}])
    const obj: Person = reactive({
      name: 'wj',
      age: 25
    })
    // 定义知道数据类型和返回值的函数 ?不确定有没有 可以undefined 不可null
    const addHandle = (x: number, y?: number): number => { 
      return x + (y || 3)
    }
    const totalname = (firstname: string, ...restname: string[]): string => {
      return firstname + restname.join(' ')
    }
    // 泛型 T在调用时决定类型
    const identity = function<T>(data: T): T {
      return data
    }
    class Greeter {
      greeting: string
      constructor(message: string) {
        this.greeting = message
      }
      greet() {
        return "Hello, " + this.greeting
      }
    }
    onMounted(() => {
      // console.log(arr[0])
      // console.log(addHandle(num.value, 2))
      // console.log(totalname('我的名字', '我', '你', '他'))
      // console.log(identity<string>('字符串'))
      // console.log(identity<number>(3333))
      // const greeter = new Greeter("world")
      // console.log(greeter.greet())
      console.log(List[0])
    })
    return {
      num,
      boy,
      message,
      obj,
      arr,
      List,
      unkonw,
      unusable,
      addHandle,
      num2,
      totalname,
      identity,
      Greeter
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.hello {
  p {
    color: #f00;
  }
}

</style>
