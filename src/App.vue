<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

* {
  box-sizing: border-box;
}
html, body {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-table td > .cell,
.el-table th > .cell {
  text-align: center !important;
}

</style>
