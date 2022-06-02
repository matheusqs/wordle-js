const counter = (word) => {
  return word.split("").reduce((total, letter) => {
    total[letter] ? total[letter]++ : (total[letter] = 1);
    return total;
  }, {});
};

const getWordControl = (word) => {
  const wordLetterCount = counter(word);
  const wordControl = {};

  for (let key in wordLetterCount) {
    wordControl[key] = {
      count: wordLetterCount[key],
      green: 0,
      yellow: 0,
    };
  }

  return wordControl;
};

const fillGreen = (
  partialResult,
  hiddenWord,
  guessedWord,
  hiddenWordControl
) => {
  return partialResult.map((item, index) => {
    const hiddenWordLetter = hiddenWord[index];

    if (hiddenWordLetter === guessedWord[index]) {
      hiddenWordControl[hiddenWordLetter].green++;
      return "G";
    }

    return item;
  });
};

const fillYellow = (
  partialResult,
  hiddenWord,
  guessedWord,
  hiddenWordControl
) => {
  return partialResult.map((item, index) => {
    if (item === undefined) {
      const guessedWordLetter = guessedWord[index];

      if (hiddenWord.indexOf(guessedWordLetter) > -1) {
        const { green, yellow, count } = hiddenWordControl[guessedWordLetter];

        if (green + yellow < count) {
          hiddenWordControl[guessedWordLetter].yellow++;
          return "Y";
        }
      }
    }

    return item;
  });
};

const fillBlack = (partialResult) => {
  return partialResult.map((item) => (item === undefined ? "B" : item));
};

const colorizeWordle = (guessedWord, hiddenWord) => {
  const result = [...Array(5)];
  const hiddenWordControl = getWordControl(hiddenWord);

  const resultFilledGreen = fillGreen(
    result,
    hiddenWord,
    guessedWord,
    hiddenWordControl
  );

  const resultFilledYellow = fillYellow(
    resultFilledGreen,
    hiddenWord,
    guessedWord,
    hiddenWordControl
  );

  const resultFilledBlack = fillBlack(
    resultFilledYellow,
    hiddenWord,
    guessedWord
  );

  return resultFilledBlack.join("");
};

// BBYGG
// BBBGG
console.log(colorizeWordle("preen", "alien"));
