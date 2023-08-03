export { links, lang, type, issue } from './data/links.js';

const chosenContainer = document.getElementById('chosen');

let chosen = [];

function addNewTag (event) {
    const target = event.target;
    const section = target.dataset.section;
    const id = target.dataset.lang ?? target.dataset.type ?? target.dataset.issue;
    const element = document.createElement('p');
    element.textContent = target.textContent;
    element.style.fontSize = '18px';
    element.style.padding = '3px 10px';
    chosen.push(element);
    chosenContainer.prepend(element);
}

function removeTag (event) {
    const target = event.target;
    console.log(target);
    chosen = chosen.filter((el) => el !== target);
    target.remove();
}

const tags = document.getElementsByClassName('tag');

for (const tag of tags) {
    tag.addEventListener('click', addNewTag);
}
chosenContainer.addEventListener('click', removeTag);
