import {getRandomInteger, getRandomFraction} from '../utils/common.js';
import {nanoid} from 'nanoid';
const generateTitle = () => {
  const titles = [
    'Amadeus',
    'The Hurt Locker',
    'Mad Max: Fury Road',
    'The Truman Show',
    'Finding Nemo',
    'The Silence of the Lambs',
    'The Circus',
    'Stagecoach',
    ' Stagecoach',
    ' Little Women',
    'Days of Heaven'
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateTrueOrFalse = () => Math.random() > 0.5;

const generateDescription = () => {
  const descriptions = [
    'This 1984 biopic chronicles the life of Amadeus Mozart, namely through the eyes of his bitter contemporary Antonio Salieri. Striving for authenticity, director Milos Forman shot the film using only natural light—arguably taking some cues from Stanley Kubrick, who did the same when making “Barry Lyndon.” Tom Hulce went above and beyond to prepare for his role as the famous composer, including practicing piano for four to five hours a day before filming began. The work paid off: “Amadeus” netted eight Academy Awards, including Best Picture.',
    'Kathryn Bigelow career hit a second stride with the release of her gripping Iraq War drama, “The Hurt Locker.” The film follows a bomb disposal team from one job to the next. Instead of traditional character development, the story coasts by on a wave of sustained and almost unbearable tension. It won six Academy Awards, making Bigelow the first woman in history to win for Best Director.',
    'Director George Miller resurrected his classic “Mad Max” franchise in 2015, with Tom Hardy taking on the lead role, formerly played by Mel Gibson. However, most fans would argue its Charlize Therons Furiosa who steals the show in this dazzling adventure movie, which sees her and Mad Max escaping the clutches of an evil warlord. As one might expect, the explosive action goes down in a post-apocalyptic wasteland inhabited by all sorts of depraved humans. The film took home six of the 10 Academy Awards for which it was nominated.'
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generatePoster = () => {
  const posters = [
    '/images/posters/made-for-each-other.png',
    '/images/posters/popeye-meets-sinbad.png',
    '/images/posters/sagebrush-trail.jpg',
    '/images/posters/santa-claus-conquers-the-martians.jpg',
    '/images/posters/the-dance-of-life.jpg',
    '/images/posters/the-great-flamarion.jpg',
    '/images/posters/the-man-with-the-golden-arm.jpg',

  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const Comments = [
  {
    id: 1,
    author: 'Gleb Luzin',
    comment: 'Крутой фильм.',
    date: '2022-04-11T16:11:32.554Z',
    emotion: 'smile'
  },
  {
    id: 2,
    author: 'Kiril Marchenko',
    comment: 'Мне не понравилось.',
    date: '2022-01-22T16:10:32.554Z',
    emotion: 'sleeping'
  },
  {
    id: 3,
    author: 'Ilya Poddubniy',
    comment: 'На один раз.',
    date: '2022-02-22T16:10:32.554Z',
    emotion: 'sleeping'
  }
];

export const generateCard = () => ({
  id: nanoid(),
  comments: [
    1, 2, 3
  ],
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: generateTitle(),

    totalRating: getRandomFraction(1, 9, 1),
    poster: generatePoster(),
    ageRating: 0,
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano',
      'Gleb Luzin'
    ],
    actors: [
      'Morgan Freeman',
      'Gleb Luzin'
    ],
    release: {
      date: `${getRandomInteger(1980, 2022)}-05-11T00:00:00.000Z`,
      releaseCountry: 'Finland'
    },
    runtime: 77,
    genre: [
      'Comedy',
      'Horror'
    ],
    description: generateDescription()
  },
  userDetails: {
    watchlist: generateTrueOrFalse(),
    alreadyWatched: generateTrueOrFalse(),
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: generateTrueOrFalse()
  }
});

const getCommentById = (arr) => Comments.filter((comment)=>arr.includes(comment.id));

export {getCommentById};

