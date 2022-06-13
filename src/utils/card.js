import dayjs from 'dayjs';

const getTimeFromHour = (min) =>dayjs().hour(0).minute(min).format('h');
const getTimeFromMins = (min) =>dayjs().minute(min).format('m');
const humanizeDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
const humanizeDateMain = (dueDate) => dayjs(dueDate).format('YYYY');
const humanizeDateComm = (dueDate) => dayjs(dueDate).format('YYYY/M/D h:mm');
const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortCardRating = (cardA, cardB) => cardB.filmInfo.totalRating - cardA.filmInfo.totalRating;

const sortCardDown = (cardA, cardB) => {
  const weight = getWeightForNullDate(cardA.filmInfo.release.date, cardB.filmInfo.release.date);

  return weight ?? dayjs(cardB.filmInfo.release.date).diff(dayjs(cardA.filmInfo.release.date));
};

export {getTimeFromMins, getTimeFromHour, humanizeDate, humanizeDateMain, humanizeDateComm, sortCardDown, sortCardRating};
