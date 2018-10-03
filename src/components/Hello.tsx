import * as React from "react";
import * as Style from "./Hello.scss";

export interface IHelloProps {
    compiler: string;
    framework: string;
}

export const Hello = (props: IHelloProps) => <h1 className={Style.hello}>
    Hello from {props.compiler} and {props.framework}!</h1>;
