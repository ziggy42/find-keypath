# find-keypath
Find the key path to a given value in an object.

## Installation
```sh
npm install find-keypath
```

## Usage
Get the first path to a value in an object:
```js
const obj = {
    data: [
        {
            id: 1,
            attributes: {
                children: ['a', 'b', 'c']
            }
        }
    ]
};

const { find } = require('find-keypath');
const path = find(obj, 'b'); // ['data', '0', 'attributes', 'children', '1']
```

Get all paths to a value in an object:
```js
const obj = {
    data: [
        {
            id: 1,
            attributes: {
                children: ['a', 'b', 'c']
            }
        },
        {
            value: 'b'
        }
    ]
};

const { findAll } = require('find-keypath');
const paths = findAll(obj, 'b'); // [['data', '0', 'attributes', 'children', '1'], ['data', '1', 'value']]

```
