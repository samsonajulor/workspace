import { render, screen } from "@testing-library/react";
import CardsContainer from "../CardsContainer";
import { MemoryRouter } from "react-router-dom";
import MockTheme from "../../mocks/MockTheme";
import VisitorsAndOrders from "../cards/VisitorsAndOrdersCards";
import MarketCard from '../cards/MarketCard';

describe('CardsContainer', () => {
  it('renders visitorsAndOrders component with props', () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <CardsContainer cardLable='Visitors'>
            <VisitorsAndOrders />
          </CardsContainer>
        </MockTheme>
      </MemoryRouter>
    );
    expect(screen.getByText(/1824/!)).toBeInTheDocument();
    expect(screen.getByTestId('visitors')).toBeInTheDocument();
    expect(screen.getByTestId('orders')).toBeInTheDocument();
  });

  it('renders MarketCard component with props', () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <CardsContainer cardLable='Visitors'>
            <MarketCard />
          </CardsContainer>
        </MockTheme>
      </MemoryRouter>
    );
    expect(screen.getByTestId('extensions-marketplace')).toBeInTheDocument();
  });
});
