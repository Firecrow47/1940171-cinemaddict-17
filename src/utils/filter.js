import {FilterType} from '../const';

const filter = {
  [FilterType.ALL]: (cards) => ([...cards]),
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => card.userDetails.watchlist ),
  [FilterType.ALREADYWATCHED]: (cards) => cards.filter((card) => card.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.userDetails.favorite),
};

export {filter};
