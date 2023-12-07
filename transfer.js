const { parse, stringify } = require( 'vue-i18n-translation-parser');
const fs = require('fs');
let outputjs = {}
let needID = []
// 读取 JavaScript 文件内容
const fileName = 'FILE'
const filePath = 'input.vue'; // 替换为你的 JavaScript 文件路径
const code = fs.readFileSync(filePath, 'utf8');
// const { ast } = compile(code);


function hasChinese(content) {
    let chineseRegex = /[\u4e00-\u9fff]/;
      if (chineseRegex.test(content)) return true;
    return false;
}
function exchangeToArg(content, id, type) {
    content = content.replace(/[\n\t\r]/g, '').trim();
    if (id === null || id === undefined) needID.push(content.replace(/[\"]/g, ''));
    else {
        path = fileName.replace(/[\"]/g, '') + '.' + id.replace(/[\"]/g, '') + '.' + type;
        outputjs[path] = content;
        return '$t(' + path + ')';
    }
    return null;
}
function i18n(AST, id) {
    if (AST.type === 'text') {
        if (hasChinese(AST.content)) {
            let path = exchangeToArg(AST.content, id, 'innerContent')
            if (path === null) return
            let value = '{{' + path + '}}';
            AST.content = value;
        }
        return 
    }
    id = null;
    if ("attrs" in AST && "id" in AST.attrs && AST.attrs.id) id = AST.attrs.id;
    if ("attrs" in AST && AST.attrs) {
        
        for (let key in AST.attrs) {
            if (hasChinese(AST.attrs[key])) {
                let path = exchangeToArg(AST.attrs[key], id, key)
                let newKey = ':' + key;
                AST.attrs[newKey] = path;
                delete AST.attrs[key];
            }
        }
    }
    AST.children.forEach(child => i18n(child, id))
}

const AST = parse(code);
i18n(AST[0]);
console.log(stringify(AST));
const vueContent = stringify(AST);
fs.writeFile('output.vue', vueContent, 'utf8', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('Vue content has been written to output.vue');
});
const jsonContent = JSON.stringify(outputjs);
const needIDContent = JSON.stringify(needID);

fs.writeFile('output.json', jsonContent, 'utf8', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('JSON data has been written to output.json');
});
fs.writeFile('needIDContent.json', needIDContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('JSON data has been written to output.json');
  });
  