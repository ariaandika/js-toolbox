export function getNested(obj: any, acc: string, fallback: any = "") {
    const current = getNestedRef(obj, acc, fallback)
    const lastkey = acc.split('.').at(-1)!
    return current[lastkey]
}

export function getNestedRef(obj: any, acc: string, fallback: any = "") {
    const keys = acc.split('.')
    let lastidx = keys.length - 1
    let current = obj

    keys.forEach((k,i) => {
        if (i == lastidx) { return }

        if (current[k] === undefined) {
            if (!isNaN(parseInt(keys[i + 1]))) {
                if (Array.isArray(current[k])) { }
                else {
                    current[k] = []
                }
            }
            else if (typeof current[k] === 'object') { }
            else {
                current[k] = {}
            }
        } else {
            if (!isNaN(parseInt(keys[i + 1]))) {
                if (Array.isArray(current[k])) { }
                else {
                    throw new Error(`Expected array in ${keys.slice(0,i+1).join('.')} found ${typeof current[k]}`)
                }
            }
            else if (typeof current[k] === 'object') { }
            else {
                throw new Error(`Expected object in ${keys.slice(0,i+1).join('.')} found ${typeof current[k]}`)
            }
        }

        current = current[k]
    })

    current[acc.split('.').at(-1)!] ??= fallback
    return current
}

export function setNested(obj: any, acc: string, val: any) {
    const keys = acc.split('.')
    let lastidx = keys.length - 1
    let current = obj

    keys.forEach((k,i) => {
        if (i == lastidx) { return }

        if (!isNaN(parseInt(keys[i + 1]))) {
            if (Array.isArray(current[k])) { }
            else {
                current[k] = []
            }
        }
        else if (typeof current[k] === 'object') { }
        else {
            current[k] = {}
        }


        current = current[k]
    })

    current[keys.at(-1)!] = val
}

