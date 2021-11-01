'use strict';

const cardsContainer = document.getElementById(
  'cardsContainer'
);

const HTMLElements = actors
  .filter(
    (actor) => actor.name && actor.photo && actor.birthdate
  )
  .map((actor) => createActorCard(actor));

function createActorCard(actor) {
  return createElement(
    'li',
    { classNames: ['cardWrapper'] },
    createElement(
      'article',
      { classNames: ['cardContainer'] },
      createImageWrapper(actor),
      createElement(
        'h2',
        { classNames: ['cardName'] },
        document.createTextNode(actor.name || 'noname')
      ),
      createElement(
        'p',
        { classNames: ['cardDescription'] },
        document.createTextNode(
          actor.birthdate || 'unknown'
        )
      )
    )
  );
}
cardsContainer.append(...HTMLElements);

/**
 *
 * @param {string} type
 * @param {object} options
 * @param {string[]} options.classNames
 * @param {function} options.onClick
 * @param {Node[]} children
 * @returns {Node}
 */
function createElement(type, { classNames }, ...children) {
  const elem = document.createElement(type);
  elem.classList.add(...classNames);
  elem.append(...children);
  return elem;
}

function createImageWrapper(actor) {
  const { name, id } = actor;
  const imageWrapper = document.createElement('div');
  imageWrapper.setAttribute('id', `wrapper${id}`);
  imageWrapper.classList.add('cardImageWrapper');

  const initials = document.createElement('div');
  initials.classList.add('cardInitials');
  initials.append(
    document.createTextNode(getInitials(name || 'noname'))
  );
  initials.style.backgroundColor = stringToColour(name);

  imageWrapper.append(initials);
  createImage(actor);
  return imageWrapper;
}

function createImage({ photo, name, id }) {
  const image = document.createElement('img');
  image.classList.add('cardImage');
  image.setAttribute('src', photo);
  image.setAttribute('alt', getInitials(name));
  image.dataset.id = id;
  image.addEventListener('error', handleImageError);
  image.addEventListener('load', handleImageLoader);
}

function handleImageError({ target }) {
  target.remove();
}

function handleImageLoader({
  target,
  target: {
    dataset: { id },
  },
}) {
  document.getElementById(`wrapper${id}`).append(target);
}

function stringToColour(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

