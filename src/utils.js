import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const getTimeFromMins = (min) =>dayjs().hour(0).minute(min).format('hч mмин');
const humanizeDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
const humanizeDateMain = (dueDate) => dayjs(dueDate).format('YYYY');
const humanizeDateComm = (dueDate) => dayjs(dueDate).format('M/D/YYYY h:mm');


export {getRandomInteger, getTimeFromMins, humanizeDate, humanizeDateMain, humanizeDateComm};
