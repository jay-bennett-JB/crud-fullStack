/// <reference types="cypress" />
describe("Update Task", () => {
  const mockTask = {
    id: 1,
    taskID: 101,
    name: "Input Task",
    description: "Loaded from API",
    dueDate: "2025-02-10",
    priority: "low",
  };

  beforeEach(() => {
    cy.visit("http://localhost:3000/updateTask");
  });

  //Integration Test 1 - Should fetch and check task
  it("This should complete a full update flow", () => {
    //Inputs data to exist for test to call
    cy.intercept("PUT", `/transactions/task/${mockTask.taskID}`, mockTask);
    //Intercept Get requests
    cy.intercept("GET", `/transactions/task/${mockTask.taskID}`, mockTask).as("getTask");
    cy.intercept("PUT", `/transactions/task/${mockTask.taskID}`, (req) => {
      expect(req.body).to.include({ name: "Updated Task", description: "New Description" });
      req.reply({ statusCode: 200 });
    }).as("updateTask");

    //Task Retrieval Phase
    cy.get('.MuiTextField-root input[type="text"]').first().type(mockTask.taskID);
    cy.contains("Retrieve task").click();
    cy.wait("@getTask");

    //Form Interaction
    cy.get('[id="task-form"]').within(() => {
      cy.get('[data-testid="task-id"]').clear().type(101);
      cy.get('[data-testid="task-name"]').clear().type("Updated Task");
      cy.get('[data-testid="task-desc"]').clear().type("New Description");
      cy.get('[data-testid="task-due"] input').clear().type("2025-03-01");
      cy.get('[data-testid="task-priority"] input[value="high"]').check();
    });

    //Submission and Verification
    cy.get('[data-testid="submit-btn"]').click();
    cy.wait("@updateTask").its("response.statusCode").should("eq", 200);
    cy.url().should("include", "/success");
    cy.contains("Task updated successfully").should("be.visible");
  });

  it("Should display current task data", () => {
    cy.intercept("GET", "/transactions/", { body: [mockTask] }).as("fetchTasks");
    cy.visit("http://localhost:3000");
    cy.wait("@fetchTasks");

    cy.get('[data-testid="task-Full-list"] .MuiDataGrid-row')
      .first()
      .should("contain", mockTask.name)
      .and("contain", mockTask.description)
      .and("contain", mockTask.dueDate);
  });
});
