import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RepoInfoModal from "../../components/RepoInfoModal";

// Mock props
const mockOnCloseModal = jest.fn();
const mockRepoDetails = {
  name: "Sample Repo",
  description: "This is a sample description",
  watchers: 42,
  open_issues: 7,
  forks: 10,
  html_url: "https://github.com/godaddy/gdapi-ui",
  language: "JavaScript",
};

describe("RepoInfoModal Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should not render the modal when `show` is false", () => {
    render(<RepoInfoModal show={false} repoDetails={mockRepoDetails} onCloseModal={mockOnCloseModal} />);
    const modal = screen.queryByTestId("repo-info-modal");
    expect(modal).not.toBeInTheDocument();
  });

  test("should render the modal when `show` is true", () => {
    render(<RepoInfoModal show={true} repoDetails={mockRepoDetails} onCloseModal={mockOnCloseModal} />);
    const modal = screen.getByTestId("repo-info-modal");
    expect(modal).toBeInTheDocument();
  });

  test("should display correct repository details", () => {
    render(<RepoInfoModal show={true} repoDetails={mockRepoDetails} onCloseModal={mockOnCloseModal} />);
    expect(screen.getByText("Repo Name: Sample Repo")).toBeInTheDocument();
    expect(screen.getByText("Sample Repo")).toBeInTheDocument();
    expect(screen.getByText("This is a sample description")).toBeInTheDocument(); // description
    expect(screen.getByText("42")).toBeInTheDocument(); // watchers
    expect(screen.getByText("7")).toBeInTheDocument(); // open issues
    expect(screen.getByText("10")).toBeInTheDocument(); // forks
    expect(screen.getByText("JavaScript")).toBeInTheDocument(); // language
    expect(screen.getByText('https://github.com/godaddy/gdapi-ui')).toBeInTheDocument() // link
  });

  test("should call `onCloseModal` when the close button is clicked", () => {
    render(<RepoInfoModal show={true} repoDetails={mockRepoDetails} onCloseModal={mockOnCloseModal} />);

    const closeButton = screen.getByTestId("cls-btn",)
    fireEvent.click(closeButton);

    expect(mockOnCloseModal).toHaveBeenCalledTimes(1);
  });

  test("should render default values when repo details are missing", () => {
    const defaultRepoDetails = {};
    render(<RepoInfoModal show={true} repoDetails={defaultRepoDetails} onCloseModal={mockOnCloseModal} />);

    expect(screen.getByText("Repo Name: -")).toBeInTheDocument();
    expect(screen.getAllByText("-")).toHaveLength(7); // for description, watchers, open issues, forks, language
  });
});
