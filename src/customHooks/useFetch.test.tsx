import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { server, rest } from "../mocks/server";
import { AllNewsList } from "../components/AllNewsList";
import { MemoryRouter } from "react-router-dom";
import MockTheme from "../mocks/MockTheme";

// const component = <All
const setup = () =>
  render(
    <MemoryRouter>
      <MockTheme>
        <AllNewsList />
      </MockTheme>
    </MemoryRouter>
  );

// start the server before each test
beforeAll(() => server.listen());
// stop the server after each test
afterAll(() => server.close());
// reset the handlers after each test
afterEach(() => server.resetHandlers());

// test the custom hook
describe("After the application is fully loaded", () => {
    it("should render the news", async () => {
        setup();
        // expect(screen.getByText(/News/)).toBeInTheDocument();
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
    
    it("handles errors", async () => {
        server.use(
            rest.get("https://newsapi.org/v2/everything", (_req, res, ctx) => {
                return res(ctx.status(404));
            })
        )
    })
});