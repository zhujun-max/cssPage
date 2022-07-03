<template>
  <div class="">
    <LayoutOne />
  </div>
</template>
<script>
import externalComponent from '../utils/external-component';

const LayoutOne = () => externalComponent('http://localhost:3066/LayoutOne.js');
export default {
  name: "RemoteComponent",
  title: "加载远程组件",
  components: {
    LayoutOne
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
</style>