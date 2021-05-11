import debounce from "lodash/debounce";
const baseSize = 16;
function setRem() {
  let scale = document.documentElement.clientWidth / 1920;
  scale = Math.max(scale, 0.75);
  document.documentElement.style.fontSize = baseSize * scale + "px";
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = debounce(() => {
  console.log(1111)
  setRem();
}, 250);