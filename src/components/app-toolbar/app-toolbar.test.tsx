import {expect} from "chai";
import * as React from "react";
import {Link} from "react-router-dom";
import {mountWithRouter} from "test/utils";
import {AppToolbar} from "./app-toolbar";

describe("App toolbar component", () => {
    it("renders links correctly", () => {
        const wrapper = mountWithRouter(<AppToolbar/>);
        const links = wrapper.find(Link);

        expect(links).to.have.length(2);

        expect(links.findWhere((link) => link.props().to === "/")).to.have.length(1);
        expect(links.findWhere((link) => link.props().to === "/settings")).to.have.length(1);
    });
});
