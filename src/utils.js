import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return `${hours  }h ${  minutes  }m`;
};
const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
const humanizeTaskDueDateMain = (dueDate) => dayjs(dueDate).format('YYYY');
const humanizeTaskDueDateComm = (dueDate) => dayjs(dueDate).format('M/D/YYYY h:mm');


export {getRandomInteger, getTimeFromMins, humanizeTaskDueDate, humanizeTaskDueDateMain, humanizeTaskDueDateComm};
