import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../../components//LoadingSpinner";

describe("LoadingSppiner", () => {
  test("show spinner section", () => {
    render(<LoadingSpinner/>);
    const element = screen.getByTestId("loader");
    expect(element).toBeInTheDocument();
  });
});
