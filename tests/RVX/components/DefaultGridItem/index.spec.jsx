
/**
 * @jest-environment jsdom
 */
 import React from "react";
 import {
     render,
 } from "@testing-library/react";
 import "@testing-library/jest-dom/extend-expect";
 import { configure } from "@testing-library/dom";
 
 
 import DefaultGridItem from "../../../../source/RVX/components/grid/DefaultGridItem";
 
 
 configure({
     testIdAttribute: "data-uie",
 });
 
 describe("DefaultGridItem", () => {
     it("should render as expected", () => {
        const row = {
                name: 'Federico',
                surname: 'Ghedina'
            },
            { getByText } = render(
                <DefaultGridItem row={row} />
            );
         expect(getByText('name')).toBeInTheDocument();
         expect(getByText('Federico')).toBeInTheDocument();
         expect(getByText('surname')).toBeInTheDocument();
         expect(getByText('Ghedina')).toBeInTheDocument();
     });
 });
 