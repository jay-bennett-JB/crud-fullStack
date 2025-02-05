/// <reference types="cypress" />
describe("Task From", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should fill and submit the task form", () => {
    cy.get('[data-testid="task-name"]').type("New Cypress Task");
    cy.get('[data-testid="task-desc"]').type("This is a test task");
    cy.get('[data-testid="task-due"]').type("2025-02-10T12:00");
    cy.get('[data-testid="task-priority"]').check();
    cy.get('[data-testid="submit-btn"]').click();

    cy.intercept("POST", "/transactions/").as("createTask");
    cy.wait("@createTask").its("response.statusCode").should("eq", 200);
  });
  it("should display tasks from the API", () => {
    cy.intercept("GET", "/transactions/", {
      body: [
        {
          id: 1,
          taskID: 101,
          name: "Fetched Task",
          description: "Loaded from API",
          dueDate: "2025-02-10T12:00:00",
          priority: true,
        },
      ],
    }).as("fetchTasks");

    cy.visit("http://localhost:3000");
    cy.wait("@fetchTasks");

    cy.get('[data-testid="task-list"]').should("contain", "Fetched Task");
  });

  it("should delete a task", () => {
    cy.intercept("DELETE", "/transactions/1", { statusCode: 200 }).as("deleteTask");

    cy.get('[data-testid="delete-task-1"]').click();
    cy.wait("@deleteTask").its("response.statusCode").should("eq", 200);
  });
});
