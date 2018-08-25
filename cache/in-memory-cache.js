const fs = require('fs');
const es = require('event-stream');
const config = require('../config/config.dev');

/*
  Data structure for caching bad words
Node 1              A                           B                            C
Node 2      AB        AC    AD         BA         BB       BC       BD      CA    CB
Bad word  ABC ABD    ACA    ADE      BAB BAC    BBA BBD    BCE   BDD BDF   CAA 

  When need to check a word, go deep first, if word not contain a node, move on.
  If word match with any bad word stop searching
*/

function loadData(callback) {
  const wordsTree = {};
  const badWordFilePath = `./${config.filePath}`;
  var s = fs.createReadStream(badWordFilePath)
    .pipe(es.split())
    .pipe(es.mapSync(function (line) {
      s.pause();
      buildWordsTree(wordsTree, line);
      s.resume();
    })
    .on('error', function (err) {
      console.log('Error while reading file.', err);
      callback(err);
    })
    .on('end', function () {
      console.log('Build words tree successfully.');
      callback(null, wordsTree)
    })
  );
}

function buildWordsTree(tree, word, depth = 2) {
  if (!word) {
    return;
  }
  let node = '';
  const nodeList = [];
  for (let i = 0; i < depth; i++) {
    const w = word[i];
    if (!w) {
      continue;
    }
    node += w;
    nodeList.push(node);
  }
  _setNestedProperty(tree, nodeList, word);
}

function _setNestedProperty(obj, attrs, value) {
  // Fx: setNestProperty({}, [a,b], 1) return { a { b :1 } }
  var currentNode = obj;
  for (let i = 0; i < attrs.length - 1; i++) {
    const attr = attrs[i];
    if (!currentNode[attr]) {
      currentNode[attr] = {};
    }
    currentNode = currentNode[attr];
  }
  if (currentNode[attrs[attrs.length - 1]]) {
    currentNode[attrs[attrs.length - 1]].push(value);
  } else {
    currentNode[attrs[attrs.length - 1]] = [value];
  }
}

function _hasString(text, str) {
  return text.indexOf(str) > -1;
}

function doesTextContainBadWord(tree, text) {
  const rootKeys = Object.keys(tree);
  let scanTimes = 0;
  for (let i = 0; i < rootKeys.length; i++) {
    const rootKey = rootKeys[i];
    scanTimes = scanTimes + 1;
    if (!_hasString(text, rootKey)) {
      continue;
    }
    const secondKeys = Object.keys(tree[rootKey]);
    for (let j = 0; j < secondKeys.length; j++) {
      const secondKey = secondKeys[j];
      scanTimes = scanTimes + 1;
      if (!_hasString(text, secondKey)) {
        continue;
      }

      const words = tree[rootKey][secondKey];
      for (let k = 0; k < words.length; k++) {
        scanTimes = scanTimes + 1;
        const badWord = words[k];
        if (_hasString(text, badWord)) {
          console.log('Scanned', scanTimes);
          return true;
        }
      }
    }
  }
  console.log('Scanned', scanTimes);
  return false;
}

module.exports = { loadData, doesTextContainBadWord };