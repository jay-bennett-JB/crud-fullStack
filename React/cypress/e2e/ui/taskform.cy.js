/// <reference types="cypress" />
describe("Task From", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/createTask");
  });

  it("should fill and submit the task form", () => {
    cy.get('[id="task-form"]').within(() => {
      cy.get('[data-testid="task-name"]').type("New Cypress Task");
      cy.get('[data-testid="task-desc"]').type("This is a test task");

      //Due Date input has to be triggered manually due to Datefield component.
      cy.get('[data-testid="task-due"]').invoke("val", "2025-02-10T12:00").trigger("change");

      cy.get('[data-testid="task-priority"]').check();
      cy.get('[data-testid="submit-btn"]').click();
    });

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
        {
          id: 2,
          taskID: 201,
          name: "Fetched Task 2",
          description: "Loaded from API",
          dueDate: "2025-02-10T12:00:00",
          priority: true,
        },
      ],
    }).as("fetchTasks");

    cy.visit("http://localhost:3000");
    cy.wait("@fetchTasks");

    //Check rows are rendered
    cy.get('[data-testid="task-Full-list"] .MuiDataGrid-row').should("have.length", 2);

    //Verification of data in rows - First Row
    cy.get('[data-testid="task-Full-list" .MuiDataGrid-row')
      .first()
      .should("contain", "Fetched Task")
      .and("contain", "Loaded from API")
      .and("contain", "2025-02-15");

    //Second Row Test
    cy.get('[data-testid="task-Full-list" .MuiDataGrid-row')
      .first()
      .should("contain", "Fetched Task")
      .and("contain", "Loaded from API")
      .and("contain", "2025-02-15");
  });
});
