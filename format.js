const fs = require('fs');
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
const inputString = fs.readFileSync("output.json", 'utf8');
  
const formattedJSON = formatStringToJSON(inputString);
const jsonContent = JSON.stringify(formattedJSON);

fs.writeFile('output.json', jsonContent, 'utf8', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('JSON data has been written to output.json');
});

