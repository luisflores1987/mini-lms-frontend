import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { AuthContext } from "../../context/AuthContext";
import { describe, it, expect } from "vitest";

describe("ProtectedRoute", () => {
  it("should redirect to login if no token", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ token: null, login: () => {}, logout: () => {} }}>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("should render children if token exists", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ token: "fake-token", login: () => {}, logout: () => {} }}>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
