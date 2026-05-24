/** @jest-environment jsdom */
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest"; // أضفنا expect هنا
import { MemoryRouter } from "react-router-dom";
import Notifications from "../pages/Notifications"; 
import api from "../api/axios";

// نقوم بعمل الماكيت الوهمي
vi.mock("../api/axios");
vi.mock("../components/Navbar", () => ({
  default: () => <div data-testid="navbar">Navbar</div>,
}));

describe("Notifications Component Test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("1. يظهر مؤشر التحميل في البداية", () => {
    api.get.mockReturnValue(new Promise(() => {})); 
    render(
      <MemoryRouter>
        <Notifications />
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  it("2. يظهر رسالة عند عدم وجود تنبيهات", async () => {
    api.get.mockResolvedValue({ data: [] }); 

    render(
      <MemoryRouter>
        <Notifications />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("No notifications yet.")).toBeTruthy();
    });
  });

  it("3. يعرض التنبيهات بنجاح عند وصولها", async () => {
    const mockNotifications = [
      {
        id: 1,
        created_at: new Date().toISOString(),
        read_at: null,
        data: { message: "لديك طلب توظيف جديد" },
      },
    ];
    api.get.mockResolvedValue({ data: mockNotifications });

    render(
      <MemoryRouter>
        <Notifications />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("لديك طلب توظيف جديد")).toBeTruthy();
      expect(screen.getByText("1 unread")).toBeTruthy();
    });
  });
});
