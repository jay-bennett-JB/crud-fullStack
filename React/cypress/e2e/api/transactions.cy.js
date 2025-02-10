/// <reference types="cypress" />
describe("Transactions API", () => {
  const apiURL = "http://localhost:8000/transactions";

  it("should create new transactions", () => {
    cy.request("POST", apiURL, {
      taskID: 1,
      name: "Test Task",
      description: "Test Description",
      dueDate: new Date().toISOString(),
      priority: "low",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
      expect(response.body.name).to.eq("Test Task");
    });
  });

  it("Should get all transactions", () => {
    cy.request("GET", apiURL).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("should get a single transaction", () => {
    cy.request("POST", apiURL, {
      taskID: 2,
      name: "Single Task",
      description: "Get this task",
      dueDate: new Date().toISOString(),
      priority: "low",
    }).then((postResponse) => {
      cy.request("GET", `${apiURL}/${postResponse.body.id}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq("Single Task");
      });
    });
  });

  it("should update a transaction", () => {
    cy.request("POST", apiURL, {
      taskID: 3,
      name: "Old Task",
      description: "Update this task",
      dueDate: new Date().toISOString(),
      priority: "low",
    }).then((postResponse) => {
      cy.request("PUT", `${apiURL}/${postResponse.body.id}`, {
        taskID: 3,
        name: "Updated Task",
        description: "Updated description",
        dueDate: new Date().toISOString(),
        priority: "med",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq("Updated Task");
        expect(response.body.priority).to.eq("med");
      });
    });
  });

  it("should delete a transaction", () => {
    cy.request("POST", apiURL, {
      taskID: 4,
      name: "Delete Task",
      description: "This will be deleted",
      dueDate: new Date().toISOString(),
      priority: "low",
    }).then((postResponse) => {
      cy.request("DELETE", `${apiURL}/${postResponse.body.id}`).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
      });
    });
  });
});
