import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FetchSuspence from "./FetchSuspence";
import { APIError } from "../../utils/api";
import ErrorComponent from "./components/ErrorComponent";

const queryClient = new QueryClient();

describe("FetchSuspence", () => {
  it("renders fallback", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <div>
          <FetchSuspence
            data={null}
            fallback={<div>Loading...</div>}
            queryKey={["test"]}
            queryFn={() => {
              return true;
            }}
          >
            {(data) => <div>{data}</div>}
          </FetchSuspence>
        </div>
      </QueryClientProvider>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders completed", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <div>
          <FetchSuspence
            data="completed"
            queryKey={["test"]}
            queryFn={() => {
              return true;
            }}
          >
            {(data) => <div>{data}</div>}
          </FetchSuspence>
        </div>
      </QueryClientProvider>,
    );

    expect(screen.getByText("completed")).toBeInTheDocument();
  });
});

describe("ErrorComponent", () => {
  it("error message", () => {
    const error = new APIError({ message: "Test error" });
    render(<ErrorComponent error={error} />);

    expect(screen.getByText("Test error")).toBeInTheDocument();
  });
});
