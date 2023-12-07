/*
type
0 root
1 新节点
2 子节点？
3 注释
12 字符串
13 模板
 */
const { compile } = require('@vue/compiler-dom');
const fs = require('fs');
let outputjs = {}
let needID = []
// 读取 JavaScript 文件内容
const fileName = 'FILE'
const filePath = 'input.vue'; // 替换为你的 JavaScript 文件路径
const code = fs.readFileSync(filePath, 'utf8');
function getTab(tabNum) {
  var tabContent = '';
  for (var i = 0; i < tabNum; ++i) 
    tabContent+='   ';
  return tabContent;
}
function getID(ast) {
  if ("props" in ast) {
    for (let i = 0; i < ast.props.length; i++) {
      let node = ast.props[i];
      if (node.name === "id") {
        return node.value.content;
      }
    }
  } 
  return null;
}
function getAttr(ast, id) {
    let code = '';
  if ("props" in ast && ast.props.length > 0) {
    for (let i = 0; i < ast.props.properties.length; i++) {
      let node = ast.props.properties[i];
      let key = node.key.content;
      let value = node.value.content;
      let chineseRegex = /[\u4e00-\u9fff]/;
      if (chineseRegex.test(value)) {
        if (id === null) {
          needID.push(value);
        } else {
          let path = fileName + "." +id + "." + key;
          outputjs[path] = value;
          key = ":"+key;
          value = "\"$t('" + path + "')\"";
        }
      }
      code += (' ' + key + ' =' + value + ' ');

    }
  } 
  return code;
}
function getNote(content, tabNum) {
  return getTab(tabNum) + content + '\n';
}
function getInnerContent(innerContent,id, tabNum) {
  innerContent = innerContent.replace(/[\n\t\r]/g, '').trim();
  let chineseRegex = /[\u4e00-\u9fff]/;
  if (chineseRegex.test(innerContent)) {
    if (id === null) {
      needID.push(innerContent);
      return innerContent;
    } 
    else {
      let path = fileName + "." +id + ".innerContent";
      outputjs[path] = innerContent;
      innerContent = "{{ $t('" + path + "') }}";
    }
  }
  return getTab(tabNum) + innerContent + '\n';
}

function generateNode(ast, id, tabNum) {
  // let ast = ast.codegenNode;
  // if (ast.type === 19) ast = ast.consequent;
  id = getID(ast);
  let code = getTab(tabNum);
  code += (`<${ast.tag}`.replace(/"/g, '') + getAttr(ast, id) + '>\n');
  let children = ast.children;
  if (Array.isArray(children))
    for (let i = 0; i < children.length; i++) 
      code+=generateVueCode(children[i], id, tabNum + 1);
  else code+=generateVueCode(children, id, tabNum + 1);
  code += (getTab(tabNum) + `</${ast.tag}>\n`.replace(/"/g, ''));
  return code;
}
function generateVueCode(ast, id, tabNum) {
  if (ast === null || ast === undefined) return '';
  if (ast.type === 0 || ast.type === 19) 
    return generateVueCode(ast.children[0],id, tabNum);
  if (ast.type === 2) 
    return `{{ ${ast.content} }}`;
  if (ast.type === 3) 
    return getNote(ast.loc.source, tabNum);
  if (ast.type === 12) 
    return getInnerContent(ast.loc.source, id, tabNum);
  if (ast.type === 1)
    return generateNode(ast, id, tabNum);
  if (ast.type === 9) {
    let code = getTab(tabNum);
    for (let i = 0; i < ast.children.length; i++) {
      return generateVueCode(ast.children[i], id, tabNum);
    }
  }
}
 
const { ast } = compile(code);
console.log(generateVueCode(ast, null, 0))
console.log(outputjs);
console.log(needID);

const jsonContent = JSON.stringify(outputjs);

fs.writeFile('output.json', jsonContent, 'utf8', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('JSON data has been written to output.json');
});