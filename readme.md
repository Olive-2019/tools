# template-i18n

## 使用方法

1. `npm install vue-i18n-translation-parser `
2. 把template的代码放到input.vue里
3. 将transfer.js的filename改成正在改的文件名：会被用于生成路径
4. 运行一下transfer.js，会生成三个文件，分别是缺id的内容（json）、转换后的代码（vue）、转换的key-value映射关系（json）

## 存在问题

1. 仅解决template部分问题，未解决script部分问题：需要js的解析器，生成js的AST，未找到合适的
2. 会吃掉所有冒号：paser是HTML的parser，不能识别vue的语法
3. 注释全没了：paser部分的锅

## 目前苟且的方案
1. 冒号问题：先这样转，用webstorm的diff功能把缺冒号的部分改回去（diff设置一下忽略空行和制表符）
2. js：gpt
