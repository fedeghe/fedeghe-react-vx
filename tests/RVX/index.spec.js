
/**
 * @jest-environment jsdom
 */
 import React from "react";
 import {
     render,
 } from "@testing-library/react";
 import "@testing-library/jest-dom/extend-expect";
 import { configure } from "@testing-library/dom";
 
 
 import RVX from "../../source/RVX";
 
 
 configure({
     testIdAttribute: "data-uie",
 });
 
 describe("RVX - basic", () => {
     it("should render as expected", () => {
        const { getByText } = render(
                <RVX/>
            );
         expect(getByText('RVX')).toBeInTheDocument();
     });
 });
 