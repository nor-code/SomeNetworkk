export function getIndex(items, id) {
    for(let i = 0; i < items.length; i++) {
        if (items[i].id == id) return i;
    }
    return -1;
}

export function getIndex1(items, login) {
    for(let i = 0; i < items.length; i++) {
        if (items[i].login == login) return i;
    }
    return -1;
}

export function checkIn(items, id) {
    if(items) {
        for(let i = 0; i < items.length; i++) {
            if (items[i] == id) return i;
        }
    }
    return -1;
}

