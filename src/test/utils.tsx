import * as React from "react";
import {MemoryRouter as Router} from "react-router-dom";
import {mount} from "test/enzyme";

export const mountWithRouter = (node: React.ReactNode) => mount(<Router>{node}</Router>);
