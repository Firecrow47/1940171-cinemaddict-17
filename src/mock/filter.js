import {filter} from '../utils/filter.js';

export const generateFilter = (card) => Object.entries(filter).map(
  ([filterName, filterCard]) => ({
    name: filterName,
    count: filterCard(card).length,
  }),
);
