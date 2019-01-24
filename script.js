'use strict';

const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const LETTER = 'X';
const CIPHER_TEST = 'KFFBBZFMWASPNVCFDUKDAGCEWPQDPNBSNE';

let key = 'WHEATSON';
let phraseToCypher = 'IDIOCY OFTEN LOOKS LIKE INTELLIGENCE';

// TODO implement
function trimRepeatLetters(key) {
  return key;
}

function createMatrix(key) {
  let matrix = [];
  let line = 0;
  let keyArr = key.split('');
  keyArr.forEach((item, i) => {
    if (i !== 0 && i % 5 === 0) {
      line++;
    }

    if (!matrix[line]) {
      matrix[line] = [];
    }

    matrix[line].push(item);
  });

  ALPHABET.forEach((item) => {
    if (key.indexOf(item) === -1) {
      if (matrix[line].length === 5) {
        line++;
      }

      if (!matrix[line]) {
        matrix[line] = [];
      }

      matrix[line].push(item);
    }
  });

  return matrix;
}

function splitToPhraseToChunks(phraseToCypher) {
  let first = [];
  let bigramm = '';

   phraseToCypher.split('').forEach((item) => {
     if (item !== ' ') {
       if (bigramm.length === 1 && bigramm[0] === item) {
         bigramm += LETTER;
         first.push(bigramm);
         bigramm = item;
       } else {
         bigramm += item;
       }

       // debugger
       if (bigramm.length === 2) {
         first.push(bigramm);
         bigramm = '';
       }
     }
   });

   if (bigramm) {
     first.push(bigramm += LETTER);
   }

   return first;
}

function transformArrayToMap(matrix) {
  let letterMap = {};

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      letterMap[matrix[i][j]] = [i, j];
    }
  }

  return letterMap;
}

function cipherText(chunks, matrix, m) {
  let result = [];
  chunks.forEach((item) => {
    // console.log('matrix', matrix);
    // debugger
    if (matrix[item[0]][0] === matrix[item[1]][0]) {
      console.log('row');

      let firstLetterCoords = matrix[item[0]];
      let secondLetterCoords = matrix[item[1]];

      let first = (firstLetterCoords[1] + 1) < 5
        ? (firstLetterCoords[1] + 1)
        : (firstLetterCoords[1] + 1 - 5);

      let second = (secondLetterCoords[1] + 1) < 5
        ? (secondLetterCoords[1] + 1)
        : (secondLetterCoords[1] + 1 - 5);

      result.push(m[firstLetterCoords[0]][first] + m[secondLetterCoords[0]][second]);
      // let res =
    } else if (matrix[item[0]][1] === matrix[item[1]][1]) {
      console.log('column');

      let firstLetterCoords = matrix[item[0]];
      let secondLetterCoords = matrix[item[1]];

      let first = (firstLetterCoords[0] + 1) < 5
        ? (firstLetterCoords[0] + 1)
        : (firstLetterCoords[0] + 1 - 5);

      let second = (secondLetterCoords[0] + 1) < 5
        ? (secondLetterCoords[0] + 1)
        : (secondLetterCoords[0] + 1 - 5);

      result.push(m[first][firstLetterCoords[1]] + m[second][secondLetterCoords[1]]);

      // result.push('  ');
    } else {
      console.log('other');

      let firstLetterCoords = matrix[item[0]];
      let secondLetterCoords = matrix[item[1]];

// console.log('firstLetterCoords[0]', firstLetterCoords[0]);
// console.log('secondLetterCoords[1]', secondLetterCoords[1]);
// debugger
      result.push(
        m[firstLetterCoords[0]][secondLetterCoords[1]] +
        m[secondLetterCoords[0]][firstLetterCoords[1]]
      );
    }
  });

  return result;
}

function init() {
  let trimmed = trimRepeatLetters(key);
  let matrix = createMatrix(trimmed);
  console.log('matrix', matrix);
  let chunks = splitToPhraseToChunks(phraseToCypher)
  // console.log('chunks', chunks);


  let transformedMatrix = transformArrayToMap(matrix);
  console.log('transformed', transformedMatrix);

  let cipher = cipherText(chunks, transformedMatrix, matrix);
  console.log('cipherText', cipher);

  console.log('is program works correctly: ', cipher.join('') === CIPHER_TEST);
}

init();
