import {FilterType} from '../const';

const filter = {
  [FilterType.ALL]: (tasks) => tasks.filter((task) => task),
  [FilterType.WATCHLIST]: (tasks) => tasks.filter((task) => task.userDetails.watchlist ),
  [FilterType.ALREADYWATCHED]: (tasks) => tasks.filter((task) => task.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (tasks) => tasks.filter((task) => task.userDetails.favorite),
};

export {filter};
