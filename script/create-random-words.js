
const endOfLine = require('os').EOL;
const config = require('../config/config.dev');
const fs = require('fs');
let wordTmp = '';
let numberOfWords = 1000;

while (numberOfWords > 0) {
  const randomWords = Math.floor(Math.random() * 9) + 3;
  const word = createWord(randomWords);
  if (!word) {
    console.log('+', randomWords)
  }
  wordTmp += `${word}${endOfLine}`;
  if (numberOfWords % 1000 === 0 || numberOfWords === 1) {
    fs.writeFileSync(`./${config.filePath}`, wordTmp, { flag: 'a' });
    wordTmp = '';
  }
  numberOfWords--;
}
console.log('Done');

function createWord(wordLength) {
  var randomChars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p', 'r', 's', 'q',
   't', 'u', 'v', 'w','x','y','z'];
  let word = '';
  for (let i = 0; i < wordLength; i ++) {
    let random = Math.floor(Math.random() * randomChars.length);
    const char = randomChars[random];
    word += char;
  }
  return word;
}