import { getNested, getNestedRef, parseForm } from "./nested-object"
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


describe(parseForm.name, () => {

    it("parse nested field form", () => {
        const formData = new FormData()
        formData.set("train.wheel.0.status","ok")
        formData.set("train.wheel.1.status","ok")
        formData.set("train.wheel.2.status","broken")

        const app = parseForm(formData)

        expect(app).toEqual({ train: { wheel: [{ status: "ok" },{ status: "ok" },{ status: "broken" }] } })
    })

})


