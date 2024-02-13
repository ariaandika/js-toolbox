import type { StoresValues, Writable } from "svelte/store"
import type { Access, Fields } from "./types"
import { get, writable } from "svelte/store"
import { getNestedRef } from "./nested-object"
const noop = <T>(v: T) => v

export function proxy<S extends Writable<any>,T>(
    store: S,
    getter: (target: StoresValues<S>) => T,
    setter: (val: T, target: StoresValues<S>) => StoresValues<S>
): Writable<T> {
    const { subscribe, update } = store
    return {
        subscribe(fn) {
            return subscribe(target => fn(getter(target)))
        },
        set(val) {
            update(target => setter(val, target))
        },
        update(fn) {
            update(target => setter(fn(getter(target)), target))
        },
    }
}

/**

The nested object reference is cached, so if the nested
object reference change inside base store, this will break

*/
export function forward<S extends object,F extends Fields<S>>(
    store: Writable<S>, field: F,
    override: (val: Access<S,F>, target: S) => Access<S,F> = noop
): Writable<Access<S,F>> {
    const { subscribe, update } = store

    const lastkey = field.split('.').at(-1)!
    const ob = getNestedRef(get(store),field)

    // should we compute every single access, or cache the reference

    return {
        subscribe(fn) {
            return subscribe(_ => fn(ob[lastkey]))
        },
        set(val) {
            update(target => { ob[lastkey] = override(val, target) ;return target })
        },
        update(fn) {
            // update(target => { ob[lastkey] = overide(fn(target[field]),target) ;return target })
            update(target => { ob[lastkey] = override(fn(ob[lastkey]), target); return target })
        },
    }
}

/**

1. Store for creating nested object if doesnt exists
2. Store for validation in nested object

*/
export function example() {

    const store = writable<{ name: string, orders: { name: string, total: number }[] }>()


    // flexible, verbose
    const proxied = proxy(
        store,
        ($store) => $store.name,
        (val, $store) => { $store.name = val ;return $store },
    )

    proxied.set("John") // bind to input


    // simple, nested object
    const forwardedv2 = forward(store,"orders.9.total")

    forwardedv2.set(991) // bind to input
}



