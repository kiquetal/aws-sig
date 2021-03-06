"use strict";

const config = require("./lib/config.js");

const sign = require("../dist/aws-sig.cjs.js");

describe("aws-sig", () => {
    it("should sort SignedHeaders by name", () => {
        expect(
            sign({
                url     : "https://aws.amazon.com",
                headers : {
                    "X-Amz-Date" : "20150830T123600Z",

                    z : 1,
                    a : 1,
                    m : 1,
                },
            }, config())
        ).toMatchSnapshot();
    });

    it("should throw on a missing request param", () => {
        expect(() =>
            sign()
        ).toThrowErrorMatchingSnapshot();
    });

    it("should throw on missing config param", () => {
        expect(() =>
            sign({})
        ).toThrowErrorMatchingSnapshot();
    });

    it("should throw on a missing config param values", () => {
        expect(() =>
            sign({ url : "https://aws.amazon.com" }, {})
        ).toThrowErrorMatchingSnapshot();
    });
    
    it("should be precise about the missing config param values", () => {
        const conf = config();

        delete conf.accessKeyId;
        delete conf.region;
        
        expect(() =>
            sign({ url : "https://aws.amazon.com" }, conf)
        ).toThrowErrorMatchingSnapshot();
    });
});
