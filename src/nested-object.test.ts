import { getNested, getNestedRef } from "./nested-object"
import { describe, it, expect, beforeEach } from "bun:test"



describe(getNested.name, () => {
    let app = {}

    beforeEach(() => {
        app = {}
    })

    it("create and get nested value", () => {
        const status = getNested(app,"train.wheel.0.status")
        expect(app).toEqual({ train: { wheel: [{ status: "" }] } })
        expect(status).toBe("")
    })

    it("create and get nested value with default", () => {
        const status = getNested(app,"train.wheel.0.status","ok")
        expect(app).toEqual({ train: { wheel: [{ status: "ok" }] } })
        expect(status).toBe("ok")
    })

    it("get existing nested value", () => {
        app = { train: { wheel: [{ status: "tired" }] } }
        const wheel = getNested(app,"train.wheel")
        expect(wheel).toEqual([{ status: "tired" }])
    })
})


describe(getNestedRef.name, () => {
    let app = {}

    beforeEach(() => {
        app = {}
    })

    it("get nested object ref", () => {
        const firstWheel = getNestedRef(app,"train.wheel.0.status")

        expect(app).toEqual({ train: { wheel: [{ status: "" }] } })
        expect(firstWheel).toEqual({ status: "" })
    })

})


