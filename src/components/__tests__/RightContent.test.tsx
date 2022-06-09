import { render, screen } from "@testing-library/react";
import CardsContainer from '../CardsContainer';
import { MemoryRouter } from "react-router-dom";
import MockTheme from "../../mocks/MockTheme";
import RightContent from '../RightContent';

describe("Content", () => {
  it("renders  Configure your shop component", () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <CardsContainer cardLable='Configure your shop'>
            <RightContent />
          </CardsContainer>
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
          <CardsContainer cardLable='Trustpilot'>
            <RightContent />
          </CardsContainer>
        </MockTheme>
      </MemoryRouter>
    );
    expect(screen.getByTestId("right-section-trustpilot")).toBeInTheDocument();
  });

  it("renders Invite friend component", () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <CardsContainer cardLable='Invite friend'>
            <RightContent />
          </CardsContainer>
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
          <CardsContainer cardLable='Customer support'>
            <RightContent />
          </CardsContainer>
        </MockTheme>
      </MemoryRouter>
    );
    expect(
      screen.getByTestId("right-section-customer-support")
      ).toBeInTheDocument();
      expect(screen.getByRole("button")).toHaveTextContent(/Contact Us/);
  });
});
