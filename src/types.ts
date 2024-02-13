export type Fields<O,P extends string = ''> =
    O extends Array<infer R>
        ? Fields<R,`${P}.${number}`> : 
    O extends object
        ? Extract<keyof {
            [x in keyof O as
                O[x] extends object
                    ? Fields<O[x],`${P}.${Extract<x,string>}`>
                    : RmLeadDot<`${P}.${Extract<x,string>}`> 
            ]: string
        },string>
        :
    P extends "" ? "HNANEEKOA" : RmLeadDot<P>;


export type PartialFields<O,P extends string = ''> =
    O extends Array<infer R>
        ? RmLeadDot<`${P}.${number}`> | PartialFields<R,`${P}.${number}`> : 
    O extends object
        ? Extract<keyof {
            [x in keyof O as
                O[x] extends object
                    ? (RmLeadDot<`${P}.${Extract<x,string>}`> | PartialFields<O[x],`${P}.${Extract<x,string>}`>)
                    : RmLeadDot<`${P}.${Extract<x,string>}`> 
            ]: string
        },string>
        :
    P extends "" ? "HNANEEKOA" : RmLeadDot<P>;


export type Access<S,F extends Fields<S>> =
    S extends Array<infer A>
        ? F extends `${infer L}.${infer R}`
            ? L extends `${number}` ? Access<A,R extends Fields<A, ""> ? R : never> : "RAPOAKEA"
            : A
        :
    S extends object
        ? F extends `${infer L}.${infer R}`
            ? L extends keyof S ? Access<S[L],R extends Fields<S[L], ""> ? R : never> : "FAKWAFKAFK"
            : F extends keyof S ? S[F] : "MBEWHM"
        :
    F extends keyof S ? S[F] : "PJJAHRE"
;

export type PartialAccess<S,F extends PartialFields<S>> =
    S extends Array<infer A>
        ? F extends `${infer L}.${infer R}`
            ? L extends `${number}` ? PartialAccess<A,R extends PartialFields<A, ""> ? R : never> : "RAPOAKEA"
            : A
        :
    S extends object
        ? F extends `${infer L}.${infer R}`
            ? L extends keyof S ? PartialAccess<S[L],R extends PartialFields<S[L], ""> ? R : never> : "FAKWAFKAFK"
            : F extends keyof S ? S[F] : "MBEWHM"
        :
    F extends keyof S ? S[F] : "PJJAHRE"
;

export type Infers<O,Tail = string> =
    O extends Array<infer R>
        ? { [x: number]: Infers<R> }
        :
    O extends object
        ? {
            [x in keyof O]: O[x] extends object ? Infers<O[x]> : Tail
        }
        : never

export type RmLeadDot<S> = S extends `.${infer R}` ? R : S


type Test = Fields<{ train: { wheel: { status: string, size: number }[], pilot: string } }>
type Test2 = PartialFields<{ train: { wheel: { status: string }[] } }>
type Test3 = Access<{ train: { wheel: { connected: boolean }[] } },"train.wheel.0.connected">
type Test4 = PartialAccess<{ train: { wheel: { connected: boolean }[] } },"train.wheel">
// not intended use case
type Test7 = Infers<{ train: { wheel: { status: string }[] } },() => Promise<Response>>


