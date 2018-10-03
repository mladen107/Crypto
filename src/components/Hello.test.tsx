import {expect} from "chai";
import * as React from "react";
import {mount} from "test/enzyme";
import {Hello} from "./Hello";

describe("Hello", () => {
    it("should do something", () => {
        const test = <Hello compiler={"test"} framework={"test"}/>;
    });
    it("should do  something", () => {
        const wrapper = mount( <Hello compiler={"test"} framework={"test"}/>);
        expect(wrapper.text()).to.contain("test");
    });
});
