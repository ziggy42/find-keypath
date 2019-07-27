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

const visitAll = (visited, paths, currentPath, obj, target) => {
    if (visited.has(obj)) {
        return;
    }

    visited.add(obj);
    for (const key in obj) {
        currentPath.push(key);

        const value = obj[key];
        if (value === target) {
            paths.push(Array.from(currentPath));
        }

        if (isObject(value)) {
            visitAll(visited, paths, currentPath, value, target);
        }

        currentPath.pop();
    }
};

const find = (obj, value) => {
    const path = [];
    visit(new Set(), path, obj, value);
    return path;
};

const findAll = (obj, value) => {
    const paths = [];
    visitAll(new Set(), paths, [], obj, value);
    return paths;
};

module.exports = { find, findAll };
