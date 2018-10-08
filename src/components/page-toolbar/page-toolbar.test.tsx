import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {expect} from "chai";
import * as React from "react";
import {mount} from "test/enzyme";
import {PageToolbar} from "./page-toolbar";

describe("Page toolbar", () => {
    it("renders correctly with refresh button", () => {
        const wrapper = mount(<PageToolbar title="test title"/>);
        const title = wrapper.find(Typography);
        const refreshButton = wrapper.find(IconButton);

        expect(title).to.have.length(1);
        expect(title.text()).to.be.eql("test title");

        expect(refreshButton).to.have.length(1);
        expect(refreshButton.props()["aria-label"]).to.be.eql("Refresh");
    });

    it("renders correctly without refresh button", () => {
        const wrapper = mount(<PageToolbar title="test title" hasRefresh={false}/>);
        const title = wrapper.find(Typography);
        const refreshButton = wrapper.find(IconButton);

        expect(title).to.have.length(1);
        expect(title.text()).to.be.eql("test title");

        expect(refreshButton).to.have.length(0);
    });

    it("passes onClick handler to refresh button", () => {
        const handler = (): void => (undefined);
        const wrapper = mount(<PageToolbar title="test title" onRefreshClick={handler}/>);
        const refreshButton = wrapper.find(IconButton);

        expect(refreshButton).to.have.length(1);
        expect(refreshButton.props().onClick).to.be.eql(handler);
    });
});
