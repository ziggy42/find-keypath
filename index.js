const isObject = (value) => value !== null && typeof value === 'object';

const visit = (visited, path, obj, target) => {
    if (visited.has(obj)) {
        return false;
    }

    visited.add(obj);
    for (const key in obj) {
        path.push(key);

        const value = obj[key];
        if (value === target) {
            return true;
        }

        if (isObject(value) && visit(visited, path, value, target)) {
            return true;
        }

        path.pop();
    }

    return false;
};

const find = (obj, value) => {
    const path = [];
    visit(new Set(), path, obj, value);
    return path;
};

module.exports = find;
