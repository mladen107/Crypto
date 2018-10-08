import {expect} from "chai";
import {PageToolbar} from "components/page-toolbar";
import * as React from "react";
import {mount} from "test/enzyme";
import {Page} from "./page";
import {PageBackButton} from "./page-back-button";

describe("Page", () => {
    const toolbarProps = {
        hasRefresh: true,
        onRefreshClick: (): void => (undefined),
        title: "test title",
    };

    it("renders correctly with back button", () => {
        const wrapper = mount(<Page hasBackButton {...toolbarProps}>
            <div id="some-test-id-1"/>
            <div id="some-test-id-2"/>
        </Page>);

        const pageToolbar = wrapper.find(PageToolbar);
        const pageBackButton = wrapper.find(PageBackButton);
        const child1 = wrapper.find("#some-test-id-1");
        const child2 = wrapper.find("#some-test-id-2");

        expect(pageToolbar).to.have.length(1);
        expect(pageToolbar.props()).to.be.eql(toolbarProps);

        expect(pageBackButton).to.have.length(1);

        expect(child1).to.have.length(1);
        expect(child2).to.have.length(1);
    });

    it("renders correctly without back button", () => {
        const wrapper = mount(<Page {...toolbarProps}>
            <div id="some-test-id-1"/>
            <div id="some-test-id-2"/>
        </Page>);

        const pageToolbar = wrapper.find(PageToolbar);
        const pageBackButton = wrapper.find(PageBackButton);
        const child1 = wrapper.find("#some-test-id-1");
        const child2 = wrapper.find("#some-test-id-2");

        expect(pageToolbar).to.have.length(1);
        expect(pageToolbar.props()).to.be.eql(toolbarProps);

        expect(pageBackButton).to.have.length(0);

        expect(child1).to.have.length(1);
        expect(child2).to.have.length(1);
    });
});
