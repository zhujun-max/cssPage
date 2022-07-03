import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import clear from 'rollup-plugin-clear';

// 正则尚不完善，还的函数处理，需要优化
function hump (str) {
  const upper = str.replace(/(?<=^|-)(\w)/g, (all, letter) => letter.toUpperCase());
  return upper.split('-').join('')
}

const components = [
  'layout-one',
  'layout-two'
].map(comp => {
  const upperComp = hump(comp);
  return {
    input: `./components/${comp}/index.vue`,
    output: {
      format: 'iife',
      file: `./dist/${upperComp}.js`,
      name: upperComp,
    },
    plugins: [
      vue(),
      commonjs(),
      clear({
        targets: ['dist'],
      }),
    ],
  };
})

export default components;