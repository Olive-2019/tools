# template-i18n

## 使用方法

1. 安装依赖：`npm install vue-i18n-translation-parser`、nodejs
2. 将所有需要修改的文件放在 `input`文件夹下
3. 修改transfer.js文件145行 `fileNames = ["a", "b"]`，数组中放需要修改的文件的文件名，不要写扩展名，如要修改a.vue文件，就添加"a"
4. 运行transfer.js（我用vscode直接运行，指定debugger为Node.js即可）
5. 会生成三个文件，分别是缺id的内容（inputFileName_stillNeedIDContent.json）、转换后的代码（inputFileName_tansfer.vue）、转换的key-value映射关系（inputFileName_kv.json）

## 存在问题

1. 仅解决template部分问题，未解决script部分问题：需要js的解析器，生成js的AST，未找到合适的
2. 会吃掉所有冒号：paser是HTML的parser，不能识别vue的语法
3. 注释全没了：paser部分的锅

## 目前苟且的方案

1. 冒号问题：先这样转，用webstorm的diff功能把缺冒号的部分改回去（diff设置一下忽略空行和制表符）
2. js：gpt
