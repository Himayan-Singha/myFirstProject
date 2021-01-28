const addItems = document.querySelector('.add-items');
let clearAll = document.getElementById('clearAll');
let checkAll = document.getElementById('checkAll');
let deleteList = document.getElementById('deleteAll');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    //console.log('hello');
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        //text: text,
        text,
        done: false
    }
    items.push(item);
    //console.clear();
    //console.table(items);
    listing(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function listing(plates = [], plateList) {
    plateList.innerHTML = plates.map((plate,i) => {
        return`
            <li>
                <input type= "checkbox" data-index= ${i} id= "item${i}" ${plate.done ? 'checked' : ''}/>
                <label for = "item${i}">${plate.text}</label>
            </li>
        `;
    }).join('');
}

function checkIt(e) {
    if (!e.target.matches('input')) return;
    //console.log(e.target);
    items[(e.target).dataset.index].done = !items[(e.target).dataset.index].done;
    localStorage.setItem('items', JSON.stringify(items));
    listing(items, itemsList);
}

addItems.addEventListener('submit', addItem);
checkAll.addEventListener('click', () => {
    items.forEach(element => (element).done = true);
    localStorage.setItem('items', JSON.stringify(items));
    listing(items, itemsList);
});
clearAll.addEventListener('click', () => {
    items.forEach(element => (element).done = false);
    localStorage.setItem('items', JSON.stringify(items));
    listing(items, itemsList);
});
itemsList.addEventListener('click', checkIt);
deleteList.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})
listing(items, itemsList);