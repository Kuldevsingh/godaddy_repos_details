import { render, screen } from "@testing-library/react";
import NotRecordFound from "../../components/NotRecordFound";

describe("NotFoundComponent", () => {
  test("renders not data found content", () => {
    render(<NotRecordFound content="No data found" />);
    const element = screen.getByText("No data found");
    expect(element).toBeInTheDocument();
  });
});
