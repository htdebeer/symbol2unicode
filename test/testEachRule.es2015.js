import Converter from "../src/Converter.js";
import DEFAULT_REPLACEMENTS from "../src/DEFAULT_REPLACEMENTS.js";

const assert = require("chai").assert;

const converter = new Converter(DEFAULT_REPLACEMENTS);

describe("The Converter", function () {
        it("should convert all default replacements in DEFAULT_REPLACEMENTS.js", function () {
            for (let [input, output] of DEFAULT_REPLACEMENTS) {
                const result = converter.run(input);
                assert.equal(result, output, `result '${result}' should be equal to '${output}'.`);
            }
        });
});

