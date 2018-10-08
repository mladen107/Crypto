import {expect} from "chai";
import * as React from "react";
import {mountWithRouter} from "test/utils";
import {AppToolbar} from "../app-toolbar";
import {AppLayout} from "./app-layout";

describe("App layout component", () => {

    const wrapper = mountWithRouter(<AppLayout>
        <div id="some-test-id-1"/>
        <div id="some-test-id-2"/>
    </AppLayout>);

    it("renders app toolbar correctly", () => {
        const toolbar = wrapper.find(AppToolbar);

        expect(toolbar).to.have.length(1);
    });

    it("renders children correctly", () => {
        const child1 = wrapper.find("#some-test-id-1");
        const child2 = wrapper.find("#some-test-id-2");

        expect(child1).to.have.length(1);
        expect(child2).to.have.length(1);
    });
});
