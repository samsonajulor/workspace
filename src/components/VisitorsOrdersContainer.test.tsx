import { render, screen } from "@testing-library/react";
import VisitorsOrdersContainer from "./VisitorsOrdersContainer";
import { MemoryRouter } from "react-router-dom";
import MockTheme from "../mocks/MockTheme";
import VisitorsAndOrders from "./VisitorsAndOrders";
import MarketDemoPlace from "./MarketDemoPlace";

describe("VisitorsOrdersContainer", () => {
  it("renders visitorsAndOrders component with props", () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <VisitorsOrdersContainer cardLable="Visitors">
            <VisitorsAndOrders />
          </VisitorsOrdersContainer>
        </MockTheme>
      </MemoryRouter>
    );
    expect(screen.getByText(/1824/!)).toBeInTheDocument();
    expect(screen.getByTestId("visitors")).toBeInTheDocument();
    expect(screen.getByTestId("orders")).toBeInTheDocument();
  });
    
  it("renders MarketDemoPlace component with props", () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <VisitorsOrdersContainer cardLable="Visitors">
            <MarketDemoPlace />
          </VisitorsOrdersContainer>
        </MockTheme>
      </MemoryRouter>
    );
    expect(screen.getByTestId("extensions-marketplace")).toBeInTheDocument();
  });
  
});
