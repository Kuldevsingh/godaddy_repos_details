import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Repos from "../../pages/Repos";
import useFetchGoDaddyRepos from "../../hooks/useFetchGoDaddyRepos";
import { NO_DATA_FOUND } from "../../appConstant";

// Mock the custom hook
jest.mock("../../hooks/useFetchGoDaddyRepos");
jest.mock("../../components/LoadingSpinner", () => () => (
  <div>Loading Spinner</div>
));
jest.mock("../../components/NotRecordFound", () => () => (
  <div>No Repos Details Found!</div>
));
jest.mock(
  "../../components/RepoInfoModal",
  () =>
    ({ show, repoDetails, onCloseModal }) =>
      show ? (
        <div data-testid="repo-info-modal">
          Repo Info Modal: {repoDetails?.name}
        </div>
      ) : null
);

describe("Repos Component", () => {
  const mockData = [
    { id: 1, name: "Repo 1" },
    { id: 2, name: "Repo 2" },
    { id: 3, name: "Repo 3" },
    { id: 4, name: "Repo 4" },
    { id: 5, name: "Repo 5" },
    { id: 6, name: "Repo 6" },
    { id: 7, name: "Repo 7" },
    { id: 8, name: "Repo 8" },
    { id: 9, name: "Repo 9" },
    { id: 10, name: "Repo 10" },
    { id: 11, name: "Repo 11" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading spinner when data is loading", () => {
    useFetchGoDaddyRepos.mockReturnValue({ data: [], loading: true });

    render(<Repos />);

    expect(screen.getByText("Loading Spinner")).toBeInTheDocument();
  });

  test("renders 'No Data Found' when no data is available", async () => {
    useFetchGoDaddyRepos.mockReturnValue({ data: [], loading: false });

    render(<Repos />);

    expect(screen.getByText(NO_DATA_FOUND)).toBeInTheDocument();
  });

  test("clicking on repo details icon opens RepoInfoModal", async () => {
    useFetchGoDaddyRepos.mockReturnValue({ data: mockData, loading: false });

    render(<Repos />);

    // Click on the eye icon for the first repo to view details
    const viewDetailsIcon = screen.getByTestId("icon-svg-1");
    fireEvent.click(viewDetailsIcon);

    // Expect modal to be shown with correct repo details
    await waitFor(() =>
      expect(screen.getByTestId("repo-info-modal")).toBeInTheDocument()
    );
  });

  test("renders pagination controls correctly", async () => {
    useFetchGoDaddyRepos.mockReturnValue({ data: mockData, loading: false });

    render(<Repos />);

    // Check if pagination controls are rendered
    expect(screen.getByTestId("left-btn")).toBeInTheDocument();
    expect(screen.getByTestId("right-btn")).toBeInTheDocument();

    // Click next page button and verify state update
    fireEvent.click(screen.getByTestId("right-btn"));
    await waitFor(() =>
      expect(screen.getByText("Repo 11")).toBeInTheDocument()
    );
  });
});
