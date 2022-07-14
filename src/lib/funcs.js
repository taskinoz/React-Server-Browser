// Comparer Function
// https://www.c-sharpcorner.com/UploadFile/fc34aa/sort-json-object-array-based-on-a-key-attribute-in-javascrip/  
export const GetSortOrder = (prop) => {
    return (a, b) => {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

export const checkPassword = (e, password) => {
    if (password) {
        e.preventDefault()
        let serverPassword = prompt("Enter Password:");
        window.location.href = `${e.target.href}:${btoa(serverPassword)}`;
    }
    window.location.href = e.target.href;
}

export const description = (desc, active) => {
    if (desc.length > 100 && !active) {
        return desc.slice(0, 100) + "..."
    }
    return desc
}

export const discordUser = (desc) => {
    return desc.match(/\w+#\d{4}/g)
}

export const filterServers = (filter, direction, array) => {
    if (filter) {
        if (direction === "asc") {
            return array.sort(GetSortOrder(filter))
        }
        else if (direction === 'dec') {
            array.sort(GetSortOrder(filter))
            return array.reverse();
        }
    }
    return array;
}