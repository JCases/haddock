import { db } from "./db";
import { orderHandler } from "./orderHandler";

const mockedDB = db as jest.Mocked<typeof db>
const mockedOrder = orderHandler as jest.Mocked<typeof orderHandler>

beforeEach(() => {
  jest.clearAllMocks();
})

describe('Order Handler', () => {
  test('Add Product', () => {
    expect(orderHandler.add(1, 1)).resolves;
  });

  test('Get Total', () => {
  });
});