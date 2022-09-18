
/**
 * @jest-environment jsdom
 */
 import React from "react";
 import {
     render,
 } from "@testing-library/react";
 import "@testing-library/jest-dom/extend-expect";
 import { configure } from "@testing-library/dom";
 
 
 import DefaultGridItem from "../../../../source/RVX/components/DefaultGridItem";
 
 
 configure({
     testIdAttribute: "data-uie",
 });
 
 describe("VTable - basic", () => {
     it("should render as expected", () => {
        const row = {
            name: 'Federico',
            surname: 'Ghedina'
        }
         const { container, getByText } = render(
             <DefaultGridItem row={row} />
         );
         expect(getByText('name')).toBeInTheDocument()
         expect(getByText('Federico')).toBeInTheDocument()
         expect(getByText('surname')).toBeInTheDocument()
         expect(getByText('Ghedina')).toBeInTheDocument()
     });
 });
 