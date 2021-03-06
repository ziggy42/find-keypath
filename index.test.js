const { find, findAll } = require('./index');

const obj = {
    data: [
        {
            id: 1,
            name: 'some name',
            attributes: {
                ttl: 10,
                url: 'example.com'
            }
        },
        {
            id: 1,
            name: 'some other name',
            attributes: {
                ttl: 20,
                url: 'someotherexample.com',
                children: ['a', 'b', 'c']
            }
        }
    ]
};

describe('find', () => {
    test('find path to string', () => {
        const path = find(obj, 'b');
        expect(path).toEqual(['data', '1', 'attributes', 'children', '1']);
    });

    test('find path to number', () => {
        const path = find(obj, 20);
        expect(path).toEqual(['data', '1', 'attributes', 'ttl']);
    });

    test('finding path in circular object doesn\'t cause RangeError', () => {
        const embedded = { a: 1 };
        const obj = { b: embedded };
        embedded.obj = obj;

        find(obj, 'missing');
    });
});

describe('findAll', () => {
    test('find all paths to string', () => {
        const path = findAll(obj, 'b');
        expect(path).toEqual([['data', '1', 'attributes', 'children', '1']]);
    });

    test('find all paths to recurring string', () => {
        const extended = JSON.parse(JSON.stringify(obj));
        extended.data.push({
            value: 'b'
        });
        const path = findAll(extended, 'b');
        expect(path).toEqual([['data', '1', 'attributes', 'children', '1'], ['data', '2', 'value']]);
    });

    test('finding all paths in circular object doesn\'t cause RangeError', () => {
        const embedded = { a: 1 };
        const obj = { b: embedded };
        embedded.obj = obj;

        findAll(obj, 'missing');
    });
});
