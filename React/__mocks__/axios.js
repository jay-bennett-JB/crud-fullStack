const axiosMock = {
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  put: jest.fn(),
  create: jest.fn(() => axiosMock),
};
export default axiosMock;
