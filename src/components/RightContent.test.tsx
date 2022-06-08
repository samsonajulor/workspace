import { render, screen } from "@testing-library/react";
import VisitorsOrdersContainer from "./VisitorsOrdersContainer";
import { MemoryRouter } from "react-router-dom";
import MockTheme from "../mocks/MockTheme";
import RightContent from './RightContent';

describe("Content", () => {
  it("renders  Configure your shop component", () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <VisitorsOrdersContainer cardLable='Configure your shop'>
            <RightContent />
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
          <VisitorsOrdersContainer cardLable='Trustpilot'>
            <RightContent />
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
          <VisitorsOrdersContainer cardLable='Invite friend'>
            <RightContent />
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
          <VisitorsOrdersContainer cardLable='Customer support'>
            <RightContent />
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
