import dayjs from 'dayjs';

const getTimeFromMins = (min) =>dayjs().hour(0).minute(min).format('hч mмин');
const humanizeDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
const humanizeDateMain = (dueDate) => dayjs(dueDate).format('YYYY');
const humanizeDateComm = (dueDate) => dayjs(dueDate).format('M/D/YYYY h:mm');


export {getTimeFromMins, humanizeDate, humanizeDateMain, humanizeDateComm};
