/* eslint-disable no-param-reassign */
const sec2time = (timeInSeconds) => {
  const pad = (num, size) => (`000${num}`).slice(size * -1);
  const time = parseFloat(timeInSeconds).toFixed(3);
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) % 60;

  return `${pad(hours, 2)}h${pad(minutes, 2)}`;
};

const shuffleArray = (array) => {
  // eslint-disable-next-line no-plusplus
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const cutUrl = (str) => {
  const matched = str.match(/([^/]*\/){3}/);
  if (matched) {
    if (matched[0].endsWith('/')) {
      return matched[0].substring(0, matched[0].length - 1);
    }
    return matched[0];
  }
  return str;
};

export {
  sec2time,
  cutUrl,
  shuffleArray,
};
