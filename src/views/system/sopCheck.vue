<template>
  <div class="sopCheck">
    222
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'

export default defineComponent({
  name: 'sopCheck',
  setup() {
    const num: Ref<number> = ref(1)
    return {
      num
    }
  },
});
</script>

<style lang="scss" scoped>

.sopCheck {
  
}

</style>