/// <reference types="cypress" />

describe("Delete Task", () => {
  const mockTask = {
    id: 1,
    taskID: 101,
    name: "Task to Delete",
    description: "This task should be removed",
    dueDate: "2025-02-10",
    priority: "high",
  };
  beforeEach(() => {
    cy.visit("http://localhost:3000/deleteTask");
  });

  //Integration Test 1 -Delete a task by ID
  it("should complete full deletion flow", () => {
    //Inputs data to exist for test to call
    cy.intercept("PUT", `/transactions/task/${mockTask.taskID}`, mockTask);

    //Setup Intercept Requests
    cy.intercept("GET", `/transactions/task/${mockTask.taskID}`, mockTask).as("getTask");
    cy.intercept("DELETE", `/transactions/task/${mockTask.taskID}`, { statusCode: 200 }).as(
      "deleteTask"
    );

    //Task Retrieval Phase
    cy.get(`.MuiTextField-root input[type="text"]`).first().type(mockTask.taskID);
    cy.contains("Retrieve task").click();
    cy.wait("@getTask");

    //Deletion confirmation
    cy.get(`[data-testid="delete-btn"]`).click();

    //Verify deletion request
    cy.wait("@deleteTask").its("response.statusCode").should("eq", 200);
    cy.url().should("include", "/success");
    cy.contains("Task deleted successfully").should("be.visible");
  });

  //Integration test 2 - Should check to ensure task has been removed
  it("should verify task removal from list", () => {
    //Intercept empty response after deletion
    cy.intercept("GET", `/transactions/`, { body: { tasks: [] } }).as("fetchTasks");

    //Check Homepage first
    cy.visit("http://localhost:3000");
    cy.wait("@fetchTasks");

    //Verify no tasks shown
    cy.get('[data-testid="test-Full-list"] .MuiDataGrid-row').should("not.exist");
  });

  //Should handle Invalid ID
  // it("Should handle invalid task ID", () => {
  //   //Intercept Error Response
  //   cy.intercept("GET", "/transactions/invalid_id", {
  //     statusCode: 404,
  //     body: { error: "Task not found" },
  //   }).as("invalidTask");

  //   //Attempt Invalid Retrieval
  //   cy.get(`.MuiTextField-root input[type="text"]`).type("invalid_task");
  //   cy.contains("Retrieve task").click();
  //   cy.wait("@invalidTask");

  //   //Verfiy error feedback
  //   cy.contains("Failed to fetch task").should("be.visible");
  // });
});
