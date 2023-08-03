import { lang, type, issue } from './data/links.js';

const chosenContainer = document.getElementById('chosen');
const linksContainer = document.getElementById('links-container');

let chosen = [];
let chosenInfo = [];

function clearLinks() {
    while (linksContainer.childNodes.length > 0) {
        linksContainer.childNodes[0].remove();
    }
}

function makeLinks() {
    const preprocessed = [];
    for (const [section, id] of chosenInfo) {
        switch (section) {
            case 'lang':
                preprocessed.push(lang[id]);
                break;
            case 'type':
                preprocessed.push(type[id]);
                break;
            case 'issue':
                preprocessed.push(issue[id]);
                break;
            default:
                console.log('something\'s wrong:(');
        }
    }
    if (preprocessed.length === 0) return;
    const processed = preprocessed[0]
        .filter((item) => {
            const booleans = preprocessed.map((links) => {
                return links.includes(item) ? true : false;
            });
            return booleans.includes(false) ? false : true;
        });
    processed.map((link) => {
        const element = document.createElement('p');
        element.innerHTML = `<a href='${link.link}'>${link.name}</a> : ${link.description}`;
        element.style.width = '100%';
        element.style.padding = '10px';
        element.style.verticalAlign = 'center';
        element.classList.add('reset');
        linksContainer.prepend(element);
    });
}

function addNewTag(event) {
    // clearLinks();
    const target = event.target;
    const section = target.dataset.section; // lang / type / issue
    const id = target.dataset.lang ?? target.dataset.type ?? target.dataset.issue;
    const element = document.createElement('p');
    element.textContent = target.textContent;
    element.style.fontSize = '18px';
    element.style.padding = '3px 10px';
    chosen.push(element);
    chosenInfo.push([section, id]);
    chosenContainer.prepend(element);
    makeLinks();
}

function removeTag(event) {
    // clearLinks();
    const target = event.target;
    const index = chosen.indexOf(target);
    chosen = chosen.filter((el) => el !== target);
    chosenInfo = chosenInfo
        .filter((el, elIndex) => elIndex !== index);
    if (target instanceof HTMLParagraphElement) target.remove();
    makeLinks();
}

chosenContainer.addEventListener('click', clearLinks);
const tags = document.getElementsByClassName('tag');
for (const tag of tags) {
    tag.addEventListener('click', clearLinks);
    tag.addEventListener('click', addNewTag);
}
chosenContainer.addEventListener('click', removeTag);
