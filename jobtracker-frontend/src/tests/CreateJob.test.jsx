import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CreateJob from "../pages/CreateJob";


const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock("../api/axios", () => ({
    default: {
        post: vi.fn(),
    },
}));

import api from "../api/axios";

const renderComponent = () =>
    render(
        <MemoryRouter>
            <CreateJob />
        </MemoryRouter>
    );

describe("CreateJob Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });


    it("renders the page without crashing", () => {
        renderComponent();
        expect(screen.getByText("Post a New Job")).toBeInTheDocument();
    });


    it("renders all form fields", () => {
        renderComponent();
        expect(screen.getByPlaceholderText("e.g. Frontend Developer")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Describe the role...")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("e.g. Remote, Gaza")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("e.g. 1500")).toBeInTheDocument();
    });

    it("renders Post Job and Cancel buttons", () => {
        renderComponent();
        expect(screen.getByRole("button", { name: /post job/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    });


    it("navigates to /company when Cancel is clicked", () => {
        renderComponent();
        fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
        expect(mockNavigate).toHaveBeenCalledWith("/company");
    });


    it("updates title field on input", () => {
        renderComponent();
        const titleInput = screen.getByPlaceholderText("e.g. Frontend Developer");
        fireEvent.change(titleInput, { target: { value: "Backend Developer" } });
        expect(titleInput.value).toBe("Backend Developer");
    });


    it("updates description field on input", () => {
        renderComponent();
        const descInput = screen.getByPlaceholderText("Describe the role...");
        fireEvent.change(descInput, { target: { value: "A great role" } });
        expect(descInput.value).toBe("A great role");
    });


    it("submits the form and navigates to /company on success", async () => {
        api.post.mockResolvedValueOnce({ data: {} });
        renderComponent();

        fireEvent.change(screen.getByPlaceholderText("e.g. Frontend Developer"), {
            target: { value: "Frontend Developer" },
        });
        fireEvent.change(screen.getByPlaceholderText("Describe the role..."), {
            target: { value: "Build UIs" },
        });
        fireEvent.change(screen.getByPlaceholderText("e.g. Remote, Gaza"), {
            target: { value: "Remote" },
        });
        fireEvent.change(screen.getByPlaceholderText("e.g. 1500"), {
            target: { value: "2000" },
        });

        fireEvent.click(screen.getByRole("button", { name: /post job/i }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/company");
        });
    });

    it("shows error message when API call fails", async () => {
        api.post.mockRejectedValueOnce({
            response: { data: { message: "Failed to create job" } },
        });
        renderComponent();

        fireEvent.change(screen.getByPlaceholderText("e.g. Frontend Developer"), {
            target: { value: "Dev" },
        });
        fireEvent.change(screen.getByPlaceholderText("Describe the role..."), {
            target: { value: "Some desc" },
        });
        fireEvent.change(screen.getByPlaceholderText("e.g. Remote, Gaza"), {
            target: { value: "Gaza" },
        });
        fireEvent.change(screen.getByPlaceholderText("e.g. 1500"), {
            target: { value: "1000" },
        });

        fireEvent.click(screen.getByRole("button", { name: /post job/i }));

        await waitFor(() => {
            expect(screen.getByText("Failed to create job")).toBeInTheDocument();
        });
    });


    it("renders employment type options", () => {
        renderComponent();
        expect(screen.getByText("Full-time")).toBeInTheDocument();
        expect(screen.getByText("Part-time")).toBeInTheDocument();
        expect(screen.getByText("Internship")).toBeInTheDocument();
    });


    it("renders status options", () => {
        renderComponent();
        expect(screen.getByText("Open")).toBeInTheDocument();
        expect(screen.getByText("Draft")).toBeInTheDocument();
        expect(screen.getByText("Closed")).toBeInTheDocument();
    });
});
