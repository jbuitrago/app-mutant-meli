let Sequences = 0;
let consecutive = 0;
let dna = [];

/**
 * @param {} reqDna
 */
exports.isMutant = async function (reqDna) {
  Sequences = 0;	
  consecutive = 0;
  dna = reqDna;
  await checkRows();
  await checkColumns();
  await checkDownFowardDiagonals();
  await checkUpFowardDiagonals();

  return Sequences>=process.env.SEQUENCES_FOR_POSITIVE;

};

/**
 * @param {}
 */
const checkRows =   () => {

	for (let i = 0; i < dna.length; i++) {
    validateRow(i);
    validateCharAt(i,0);
		consecutive = 0;
		for (let j = 0; j < dna.length - 1; j++) {
      validateCharAt(i, j + 1);
			checkPosition(i, j, i, j + 1);
		}

	}

	return true
}

/**
 * @param {}
 */
const checkColumns =   () => {

	let j = 0;

	while (keepChecking() && j < dna.length) {

		let i = 0;
		consecutive = 0;
    validateCharAt(i,0);
		while (keepChecking() && enoughRemainingSpace(dna.length - i)) {
      validateCharAt(i,0);
			checkPosition(i, j, i + 1, j);
			i++;
		}

		j++;
	}
	return true;

}

/**
 * @param {}
 */
const checkDownFowardDiagonals =   () => {
  let row = dna.length - process.env.SEQUENCE_LENGTH;

  while (keepChecking() && row >= 0) {
    let i = row;
    let j = 0;
 
    while (keepChecking() && enoughRemainingSpace(dna.length - row - j)) {
      checkPosition(i, j, i + 1, j + 1);
      i++;
      j++;
    }

    row--;
  }

  let column = 1;

  while (keepChecking() && column < dna.length - process.env.SEQUENCE_LENGTH + 1) {
    let i = 0;
    let j = column;

    while (keepChecking() && enoughRemainingSpace(dna.length - column - i)) {
      checkPosition(i, j, i + 1, j + 1);
      i++;
      j++;
    }

    column++;
  }
  return true
};

/**
 * @param {}
 */
const checkUpFowardDiagonals =   () => {
  let row = process.env.SEQUENCE_LENGTH - 1;

  while (keepChecking() && row < dna.length) {
    let i = row;
    let j = 0;

    while (keepChecking() && enoughRemainingSpace(row + 1 - j)) {
      checkPosition(i, j, i - 1, j + 1);
      i--;
      j++;
    }

    row++;
  }

  let column = 1;

  while (
    keepChecking() &&
    column < dna.length - process.env.SEQUENCE_LENGTH + 1
  ) {
    let i = dna.length - 1;
    let j = column;

    while (keepChecking() && enoughRemainingSpace(dna.length - j)) {
      checkPosition(i, j, i - 1, j + 1);
      i--;
      j++;
    }

    column++;
  }
  return true;
};

/**
 * @param  {} i
 * @param  {} j
 * @param  {} nextI
 * @param  {} nextJ
 */
const  checkPosition =   (i, j, nextI, nextJ)  => {
  let currentChar = getCharAt(i, j);
  let nextChar = getCharAt(nextI, nextJ);

  if (currentChar == nextChar) {
    consecutive++;
  } else {
    consecutive = 0;
  }

  if (consecutive == process.env.SEQUENCE_LENGTH - 1) {
    Sequences++;
    consecutive = 0;
  }
  return true;
}
/**
 * @param  {} remainingSpace
 */
const enoughRemainingSpace =  (remainingSpace) => {
  return remainingSpace >= process.env.SEQUENCE_LENGTH - consecutive;
}
/**
 */
const keepChecking =  () => {
  return Sequences < process.env.SEQUENCES_FOR_POSITIVE;
}
/**
 * @param  {} i
 * @param  {} j
 */
const  getCharAt =  (i, j) => {
  return dna[i].charAt(j);
}

const validateCharAt = ( i,  j) => {

  let c = getCharAt(i, j);

   if (process.env.POSSIBLE_LETTERS.indexOf(c)==-1) {
    throw new Error("LETRA-INVALIDA");
  }
}

const validateRow = (i) =>{
  if (dna[i].length != dna.length) {
    
    throw new Error("ARRAY-INVALIDO");
  }
}

