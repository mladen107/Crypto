import Button from "@material-ui/core/Button";
import {expect} from "chai";
import {Provider} from "mobx-react";
import {RouterStore} from "mobx-react-router";
import * as React from "react";
import {mount} from "test/enzyme";
import {PageBackButton} from "./page-back-button";

describe("Page back button", () => {
    it("renders button correctly", () => {
        const wrapper = mount(<PageBackButton/>);
        const button = wrapper.find(Button);

        expect(button).to.have.length(1);

        expect(button.props().children).to.be.eql("Go Back");
    });

    it("when clicked, calls goBack on routerStore", () => {
        const routerStore = new RouterStore();
        const mockFunction = jest.fn();
        routerStore.goBack = mockFunction;
        const wrapper = mount(<Provider routerStore={routerStore}><PageBackButton/></Provider>);

        wrapper.simulate("click");

        expect(mockFunction.mock.calls).to.have.length(1);
    });
});
