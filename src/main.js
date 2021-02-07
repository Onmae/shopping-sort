function loadItems() {
    return fetch('../data/data.json')
    .then(response => response.json()) 
    .then(json => json.items);
}

function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createItemList(item)).join('');
}

function createItemList(item) {
    return `
    <li class="item">
        <img class="item__thumnail img-sm" alt="pants" src="${item.image}" alt="${item.type}">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function setEventListeners(items){
    const container = document.querySelector('.category');
    const home = document.querySelector('.shop-image');
    home.addEventListener("click", () => displayItems(items));
    container.addEventListener("click", events => OnButtonClick(events, items));
}

function OnButtonClick(event, items) {
    const dataset = event.target.dataset;
    const type = dataset.type;
    const key = dataset.key;

    if(key == null || type == null) return ;

    displayItems(items.filter(item => item[type] === key));
}


loadItems()
    .then(items => {
        displayItems(items);
        setEventListeners(items);
    })
    .catch(console.log);