import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";


// Mock the Header and Repos components
jest.mock("./components/Header", () => () => <div>Test Header</div>);
jest.mock("./pages/Repos", () => () => <div>Test Repos Page</div>);

describe("App Component", () => {
  test("renders Header component", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check if the Header component is rendered
    expect(screen.getByText("Test Header")).toBeInTheDocument();
  });

  test("renders Repos component on default route", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check if the Repos component is rendered
    expect(screen.getByText("Test Repos Page")).toBeInTheDocument();
  });
});
