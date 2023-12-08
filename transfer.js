const { parse, stringify } = require( 'vue-i18n-translation-parser');
const fs = require('fs');
// 转换后的键值对输出
let outputjs = {}
// 还需要加id的内容，目前写入content
let needID = []
// 读取 JavaScript 文件内容
const fileName = 'TreeSelect'
const filePath = 'input.vue'; // 替换为你的 JavaScript 文件路径
const code = fs.readFileSync(filePath, 'utf8');

// 检测中文
function hasChinese(content) {
    let chineseRegex = /[\u4e00-\u9fff]/;
      if (chineseRegex.test(content)) return true;
    return false;
}
// AST转换
function exchangeToArg(content, id, type) {
    content = content.replace(/[\n\t\r]/g, '').trim();
    if (id === null || id === undefined) needID.push(content.replace(/[\"]/g, ''));
    else {
        path = fileName.replace(/[\"]/g, '') + '.' + id.replace(/[\"]/g, '') + '.' + type;
        outputjs[path] = content;
        return '$t(\'' + path + '\')';
    }
    return null;
}
// 遍历AST
function i18n(AST, id) {
    if (AST.type === 'text') {
        if (hasChinese(AST.content)) {
            let path = exchangeToArg(AST.content, id, 'innerContent')
            if (path === null) return
            let value = '\n{{' + path + '}}\n';
            AST.content = value;
        }
        return 
    }
    id = null;
    if ("attrs" in AST && "id" in AST.attrs && AST.attrs.id) id = AST.attrs.id;
    if ("attrs" in AST && "addin-id" in AST.attrs && AST.attrs["addin-id"]) id = AST.attrs["addin-id"];
    if ("attrs" in AST && AST.attrs) {
        
        for (let key in AST.attrs) {
            if (hasChinese(AST.attrs[key])) {
                let path = exchangeToArg(AST.attrs[key], id, key)
                let newKey = ':' + key;
                AST.attrs[newKey] = "\"" + path + "\"";
                delete AST.attrs[key];
            }
        }
    }
    AST.children.forEach(child => i18n(child, id))
}
// 写出数据
function outputFile(data, filename) {
  fs.writeFile(filename, data, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('JSON data has been written to output.json');
  });
}

// 输出文件的格式化
function formatStringToJSON(inputString) {
  const result = {};
  inputString = inputString.replace(/[\"{]/g, '');
  // 将输入的字符串按照逗号分隔成键值对
  const keyValuePairs = inputString.split(',');

  keyValuePairs.forEach(pair => {
    const [key, value] = pair.split(':').map(item => item.trim());
    // 将键（key）按照点号拆分成层级结构
    const keys = key.split('.');
    let current = result;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        // 如果是最后一个键，直接赋予值
        current[key] = value.replace(/[\}\"]/g, '');
      } else {
        // 如果不是最后一个键，创建子对象
        current[key] = current[key] || {};
        current = current[key];
      }
    });
  });

  return result;
}

// 读入AST
const AST = parse(code);
// i18n转换
i18n(AST[0]);
//写出文件
const vueContent = stringify(AST);
const kvContent = JSON.stringify(outputjs);
const needIDContent = JSON.stringify(needID);
const formattedJSON = formatStringToJSON(kvContent);
const jsonContent = JSON.stringify(formattedJSON);
outputFile(vueContent, fileName + '_tansfer.vue');
outputFile(needIDContent, fileName + '_stillNeedIDContent.json');
outputFile(jsonContent, fileName + '_kv.json');

