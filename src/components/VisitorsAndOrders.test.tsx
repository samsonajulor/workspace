import { render, screen } from "@testing-library/react";
import VisitorsAndOrders from "./VisitorsAndOrders";
import { MemoryRouter } from "react-router-dom";
import MockTheme from "../mocks/MockTheme";


const setup = () =>
  render(
    <MemoryRouter>
      <MockTheme>
        <VisitorsAndOrders />
      </MockTheme>
    </MemoryRouter>
  );


describe("VisitorsAndOrders", () => {    

    it("renders visitors component with the title=Vistors, and number of visitors", () => {
        setup();
        expect(screen.getByText(/1824/!)).toBeInTheDocument();
        expect(screen.getByText(/Visitors/)).toBeInTheDocument();
    })

    it("renders Orders component with the title=Orders, number of orders received and earnings", () => {
        setup();
        expect(screen.getByText(/156/!)).toBeInTheDocument();
        expect(screen.getByText(/€ 1893, 24/!)).toBeInTheDocument();
    })
})
