# Js-toolbox

## Nested Object

dir: `./src/nested-object.ts`

### `getNested(obj, acc, falback = "")`

Get value safely from nested object, and create
the neccessary object/array along the way

```ts
const app = {}
const status = getNested(app,"train.wheel.0.status")
console.log(app) // { train: { wheel: [{ status: "" }] } }
```

### `getNestedRef(obj, acc, fallback = "")`

Get last object/array reference safely from nested object, and create
the neccessary object/array along the way

```ts
const app = {}
const firstWheel = getNestedRef(app,"train.wheel.0.status")
console.log(app) // { status: "" }
console.log(firstWheel) // { train: { wheel: [{ status: "" }] } }

```

- why another ?

the `getNested` method is looping for every access, so its not good in
hot code path, instead we can get the last object reference and set property directly

- use case

i use this in svelte store when binding to form without needing a schema

## Typescript

dir: `./src/types.ts`

### `Fields<O,P extends string = ''>`

Retrieve all primitive type keys in nested object

```ts
type Test = Fields<{ train: { wheel: { status: string, size: number }[], pilot: string } }>
// "train.pilot" | `train.wheel.${number}.status` | `train.wheel.${number}.size`
```

### `PartialFields<O,P extends string = ''>`

Retrieve all possible keys

```ts
type Test = PartialFields<{ train: { wheel: { status: string }[] } }>
// "train" | "train.wheel" | `train.wheel.${number}.status` | `train.wheel.${number}`
```

- use case

typesafe form input name that can represent nested value

### `Access<S,F extends Fields<S>>`

get nested object primitives value type

```ts
type Test = Access<{ train: { wheel: { connected: boolean }[] } },"train.wheel.0.connected">
// boolean
```

### `PartialAccess<S,F extends PartialFields<S>>`

get all nested object value type

```ts
type Test = PartialAccess<{ train: { wheel: { connected: boolean }[] } },"train.wheel">
// { connected: boolean }[]
```



