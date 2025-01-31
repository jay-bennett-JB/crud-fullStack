import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";

//Mocking Child Components
jest.mock("../src/scenes/homepage", () => jest.fn(() => <div>Home Page</div>));
jest.mock("../src/scenes/createTask", () =>
  jest.fn(() => <div>Create Task Page</div>)
);
jest.mock("../src/scenes/updateTask", () =>
  jest.fn(() => <div>Update Task Page</div>)
);
jest.mock("../src/scenes/global/sidebar", () =>
  jest.fn(() => <div>Sidebar</div>)
);
jest.mock("../src/scenes/global/topbar", () =>
  jest.fn(() => <div>Topbar</div>)
);

// Test
describe("App Components", () => {
  test("Renders the hompage by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    //Assert that the homepage renders by default
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  //Create Task Render
  test("renders the create task page when navigating to /createTask", () => {
    render(
      <MemoryRouter initialEntries={["/createTask"]}>
        <App />
      </MemoryRouter>
    );

    // Assert that the create task page renders
    expect(screen.getByText("Create Task Page")).toBeInTheDocument();
  });

  test("renders the update task page when navigating to /updateTask", () => {
    render(
      <MemoryRouter initialEntries={["/updateTask"]}>
        <App />
      </MemoryRouter>
    );

    // Assert that the update task page renders
    expect(screen.getByText("Update Task Page")).toBeInTheDocument();
  });

  test("renders Sidebar and Topbar components", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // Assert that Sidebar and Topbar render
    expect(screen.getByText("Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Topbar")).toBeInTheDocument();
  });
});
