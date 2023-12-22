const { parse, stringify } = require( 'vue-i18n-translation-parser');
const fs = require('fs');
// 转换后的键值对输出
let outputjs = {}
// 还需要加id的内容，目前写入content
let needID = []


// 检测中文
function hasChinese(content) {
    let chineseRegex = /[\u4e00-\u9fff]/;
      if (chineseRegex.test(content)) return true;
    return false;
}
// AST转换
function exchangeToArg(content, id, type, fileName) {
    if (content === null || content === undefined || fileName === null || fileName === undefined) return null
    
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
function i18n(AST, id, fileName) {
    // innerConent部分
    if (AST.type === 'text') {
        if (hasChinese(AST.content)) {
            let path = exchangeToArg(AST.content, id, 'innerContent', fileName)
            if (path === null) return
            let value = '\n{{' + path + '}}\n';
            AST.content = value;
        }
        return 
    }
    // tag部分
    id = null;
    // 刘博说addin-id优先级更高来着，还好逻辑对上了
    if ("attrs" in AST && "id" in AST.attrs && AST.attrs.id) id = AST.attrs.id;
    if ("attrs" in AST && "addin-id" in AST.attrs && AST.attrs["addin-id"]) id = AST.attrs["addin-id"];
    if ("attrs" in AST && AST.attrs) {
        
        for (let key in AST.attrs) {
            if (hasChinese(AST.attrs[key])) {
                let path = exchangeToArg(AST.attrs[key], id, key, fileName)
                let newKey = ':' + key;
                AST.attrs[newKey] = "\"" + path + "\"";
                delete AST.attrs[key];
            }
        }
    }
    AST.children.forEach(child => i18n(child, id, fileName))
}
// 写出数据
function outputFile(data, filename) {
  fs.writeFile("output/" + filename, data, 'utf8', (err) => {
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
        // console.log(value)
        if (value != undefined)
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
// 读取文件内容
function getTemplateContent(filePath) {
  data = fs.readFileSync(filePath, 'utf8');
  // 使用正则表达式匹配template内容
  const templateMatch = data.match(/<template[^>]*>([\s\S]*?)<\/template>/i);
  if (templateMatch && templateMatch[0]) {
    // 提取并打印template部分
    // console.log('Template content:', templateMatch[0]);
    return templateMatch[0]
  } else {
    console.error('未找到template部分或template部分为空。');
  }
  
}
// 补上符号失败的尝试，可以尝试挑战一下
function compareAndComplete(baseCode, incompleteCode) {
  // 使用正则表达式找出所有可能的属性和事件绑定
  const baseMatches = [...baseCode.matchAll(/(:|@)[^\s="'<>]+/g)];
  const incompleteMatches = [...incompleteCode.matchAll(/(:|@)?[^\s="'<>]+/g)];

  // 创建一个映射来存储基准代码中的属性和事件绑定
  let baseMapping = {};
  baseMatches.forEach(match => {
    const key = match[0].substring(1); // 去掉":"或"@"
    baseMapping[key] = match[0].substring(0, 1); // 存储":"或"@"
  });

  // 遍历不完整代码中的匹配项，并补上缺少的符号
  incompleteMatches.forEach((match, index) => {
    const key = match[0].replace(/(:|@)/, '');
    if (baseMapping[key] && !match[0].startsWith(baseMapping[key])) {
      // 在原字符串中找到匹配项的索引位置
      const startIndex = match.index;
      const symbol = baseMapping[key];
      // 在不完整的代码字符串中插入缺失的符号
      incompleteCode = incompleteCode.slice(0, startIndex) + symbol + incompleteCode.slice(startIndex);
    }
  });

  return incompleteCode;
}





// console.log('Completed code:', completedCode);

fileNames = ["a", "b"]
fileNames.forEach(
  fileName => {
    // 转换后的键值对输出
    outputjs = {}
    // 还需要加id的内容，目前写入content
    needID = []

    const filePath = "input/"+fileName + '.vue'; // 替换为你的 JavaScript 文件路径
    var code = getTemplateContent(filePath)
    // 完整的代码（作为基准）
    const baseCode = code;

    // console.log(code)
    // 读入AST
    const AST = parse(code);
    // i18n转换
    i18n(AST[0],null, fileName);
    //写出文件
    const vueContent = stringify(AST);
    // 缺少符号的代码
    const incompleteCode = vueContent;
    // 执行对比和补全
    const completedCode = compareAndComplete(baseCode, incompleteCode);
    const kvContent = JSON.stringify(outputjs);
    const needIDContent = JSON.stringify(needID);
    const formattedJSON =  formatStringToJSON(kvContent);
    const jsonContent = JSON.stringify(formattedJSON, null, 2);
    outputFile(vueContent, fileName + '_tansfer.vue');
    outputFile(needIDContent, fileName + '_stillNeedIDContent.json');
    outputFile(jsonContent, fileName + '_kv.json');
  }
)
// // 读取 JavaScript 文件内容
// const fileName = 'ExternalEntityModeling'


