const axiosMock = {
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        { id: 1, name: "Task 1", description: "Test task" },
        { id: 2, name: "Task 2", description: "Another test task" },
      ],
    })
  ),
  post: jest.fn(() => Promise.resolve({ data: { success: true } })),
  delete: jest.fn(() => Promise.resolve({ data: { deleted: true } })),
  create: jest.fn(() => axiosMock),
};
export default axiosMock;
