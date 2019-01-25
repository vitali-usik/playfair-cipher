'use strict';

const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const LETTER = 'X';
const MAX_LENGTH = 5;

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
    if (i !== 0 && i % MAX_LENGTH === 0) {
      line++;
    }

    if (!matrix[line]) {
      matrix[line] = [];
    }

    matrix[line].push(item);
  });

  ALPHABET.forEach((item) => {
    if (key.indexOf(item) === -1) {
      if (matrix[line].length === MAX_LENGTH) {
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

function getCoord(letterCoord) {
  return (letterCoord + 1) < MAX_LENGTH
    ? (letterCoord + 1)
    : (letterCoord + 1 - MAX_LENGTH);
}

function cipherText(chunks, matrix, m) {
  let result = [];
  chunks.forEach((item) => {
    let firstLetterCoords = matrix[item[0]];
    let secondLetterCoords = matrix[item[1]];

    if (matrix[item[0]][0] === matrix[item[1]][0]) {
      console.log('row');

      let first = getCoord(firstLetterCoords[1]);
      let second = getCoord(secondLetterCoords[1]);

      result.push(
        m[firstLetterCoords[0]][first] +
        m[secondLetterCoords[0]][second]
      );
    } else if (matrix[item[0]][1] === matrix[item[1]][1]) {
      console.log('column');

      let first = getCoord(firstLetterCoords[0]);
      let second = getCoord(secondLetterCoords[0])

      result.push(
        m[first][firstLetterCoords[1]] +
        m[second][secondLetterCoords[1]]
      );
    } else {
      console.log('other');

      result.push(
        m[firstLetterCoords[0]][secondLetterCoords[1]] +
        m[secondLetterCoords[0]][firstLetterCoords[1]]
      );
    }
  });

  return result;
}

function renderMatrix(matrix) {
  let matrixElement = document.getElementById('matrix');
  let fragment = document.createDocumentFragment();

  matrix.forEach((rows) => {
    let rowDiv = document.createElement('div');
    rowDiv.className = 'matrixRow';
    rows.forEach((item) => {
      let divItem = document.createElement('div');
      divItem.textContent = item;
      rowDiv.appendChild(divItem);
    });
    fragment.appendChild(rowDiv);
  });

  matrixElement.appendChild(fragment);
}

function init() {
  let trimmed = trimRepeatLetters(key);
  let matrix = createMatrix(trimmed);
  console.log('matrix', matrix);
  renderMatrix(matrix);
  let chunks = splitToPhraseToChunks(phraseToCypher)
  // console.log('chunks', chunks);


  let transformedMatrix = transformArrayToMap(matrix);
  console.log('transformed', transformedMatrix);

  let cipher = cipherText(chunks, transformedMatrix, matrix);
  console.log('cipherText', cipher);

  console.log('is program works correctly: ', cipher.join('') === CIPHER_TEST);
}

init();
