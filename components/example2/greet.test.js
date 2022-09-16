import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Greet from "@/components/example2";

/*
 * EXAMPLE2: TEST redux:useReducer and mock-service-worker
 * SOURCE: testing library react example: https://testing-library.com/docs/react-testing-library/example-intro
 */

describe("Example2: Greet", () => {
  const server = setupServer(
    rest.get("/greeting", (_req, res, ctx) => {
      return res(ctx.json({ greeting: "hello there" }));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("loads and displays greeting", async () => {
    render(<Greet url="/greeting" />);

    fireEvent.click(screen.getByText("Load Greeting"));

    await waitFor(() => screen.getByRole("heading"));

    expect(screen.getByRole("heading")).toHaveTextContent("hello there");
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("handles server error", async () => {
    server.use(
      rest.get("/greeting", (_req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Greet url="/greeting" />);

    fireEvent.click(screen.getByText("Load Greeting"));

    await waitFor(() => screen.getByRole("alert"));

    expect(screen.getByRole("alert")).toHaveTextContent("Oops, failed to fetch!");
    expect(screen.getByRole("button")).not.toBeDisabled();
  });
});
