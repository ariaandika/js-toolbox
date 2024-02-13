# Js-toolbox

## Nested Object

### `getNested(obj, acc, falback = "")`

Get value safely from nested object, and create
the neccessary object/array along the way

```ts
const app = {}
const status = getNested(app,"train.wheel.0.status")
console.log(app) // { train: { wheel: [{ status: "" }] } }
```

- use case

i use this in svelte store when binding to form without needing a schema

### `getNestedRef(obj, acc, fallback = "")`

Get last object/array reference safely from nested object, and create
the neccessary object/array along the way

```ts
const app = {}
const status = getNested(app,"train.wheel.0.status")
console.log(app) // { train: { wheel: [{ status: "" }] } }
```

- why ?

the `getNested` method is looping for every access, so its not good in
hot code path, instead we can get the last object reference and set property directly

- use case

i use this in svelte store when binding to form without needing a schema

