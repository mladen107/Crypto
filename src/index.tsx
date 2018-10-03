import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.scss";

import { Hello } from "./components/Hello";

const rootNode = document.createElement("div");
document.body.appendChild(rootNode);

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    rootNode,
);
