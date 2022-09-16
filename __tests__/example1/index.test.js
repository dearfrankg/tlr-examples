import { render, screen } from "@testing-library/react";
import Home from "@/components/example1";

/*
 * EXAMPLE1: TEST snapshot and getByRole
 * SOURCE: nextjs example: `npx create-next-app --example with-jest <app_name>`
 */
describe("Example1: Home", () => {
  it("renders homepage unchanged", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Testing Library React Examples/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
