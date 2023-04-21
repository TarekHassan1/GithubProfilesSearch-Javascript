const APIURL = 'https://api.github.com/users/';
const input = document.querySelector('input');
let requestInProgress = false;

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

function createCard(data) {
  let card = document.createElement('div');
  card.classList.add('card');

  let imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');
  let image = document.createElement('img');
  image.src = `${data.avatar_url}`;
  imageContainer.appendChild(image);
  let details = document.createElement('div');
  details.classList.add('details');
  let h1 = document.createElement('h1');
  h1.innerHTML = `${data.login}`;
  let h2 = document.createElement('h2');
  h2.innerHTML = `${data.id}`;

  let follow = document.createElement('div');
  follow.classList.add('follow');

  let span1 = document.createElement('span');
  span1.innerHTML = `${data.followers!==undefined?data.followers+" followers":"null"} `;

  let span2 = document.createElement('span');
  span2.innerHTML = `${data.following!==undefined?data.following+" following":"null"}`;

  let span3 = document.createElement('span'); 
  span3.innerHTML = `${data.public_repos!==undefined?data.public_repos+" repos":"null"}`;
  follow.append(span1, span2, span3);

  let repos = document.createElement('div');
  repos.classList.add('repos');
  const reposApi = APIURL + input.value + '/repos?sort=created';
  fetchData(reposApi).then((data2) => {
    for (let i = 0; i < 5; ++i) {
      let span = document.createElement('span');
      span.innerHTML = `${data2[i].name}`;
      repos.appendChild(span);
    }
  });
  details.append(h1, h2, follow, repos);
  card.append(imageContainer, details);
  document.body.appendChild(card);
}

function removeExistingCard() {
  const existingCard = document.querySelector('.card');
  if (existingCard) {
    existingCard.remove();
  }
}

async function getData() {
  if (requestInProgress) {
    return;
  }
  requestInProgress = true;

  try {
    const data = await fetchData(APIURL + input.value);
    removeExistingCard();
    createCard(data);
  } catch (err) {
    console.log(err);
  } finally {
    requestInProgress = false;
  }
}

// Call getData() when the input value changes
input.addEventListener('input', getData);

// Call getData() initially to create the initial card
window.addEventListener('DOMContentLoaded', getData);
