import { render, screen } from "@testing-library/react";
import VisitorsOrdersContainer from "./VisitorsOrdersContainer";
import { MemoryRouter } from "react-router-dom";
import MockTheme from "../mocks/MockTheme";
import RightSection from "./RightSection";

describe("RightSection", () => {
  it("renders  Configure your shop component", () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <VisitorsOrdersContainer cardLable="Configure your shop">
            <RightSection />
          </VisitorsOrdersContainer>
        </MockTheme>
      </MemoryRouter>
    );
    expect(
      screen.getByTestId("right-section-percentage")
    ).toBeInTheDocument();
  });

  it("renders Trustpilot component", () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <VisitorsOrdersContainer cardLable="Trustpilot">
            <RightSection />
          </VisitorsOrdersContainer>
        </MockTheme>
      </MemoryRouter>
    );
    expect(screen.getByTestId("right-section-trustpilot")).toBeInTheDocument();
  });

  it("renders Invite friend component", () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <VisitorsOrdersContainer cardLable="Invite friend">
            <RightSection />
          </VisitorsOrdersContainer>
        </MockTheme>
      </MemoryRouter>
    );
    expect(
      screen.getByTestId("right-section-invite-friend")
    ).toBeInTheDocument();
  });

  it("renders Customer support component", () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <VisitorsOrdersContainer cardLable="Customer support">
            <RightSection />
          </VisitorsOrdersContainer>
        </MockTheme>
      </MemoryRouter>
    );
    expect(
      screen.getByTestId("right-section-customer-support")
      ).toBeInTheDocument();
      expect(screen.getByRole("button")).toHaveTextContent(/Contact Us/);
  });
});
