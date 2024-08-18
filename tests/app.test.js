let request = require('supertest');
let http  = require('http');
let { app } = require('../index');
let { retrieveAllEmployees, retriveEmployeeById } = require('../data');

jest.mock('../data', () => ({
  ...jest.requireActual('../data'),
  retrieveAllEmployees: jest.fn(),
  retriveEmployeeById: jest.fn()
}));

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen(3001)
});

afterAll(() => {
  server.close();
})

describe('API Endpoints Testign', () => {
  
  it('should retirve all employee with 200  status code', async () => {
    let employeesData = [
        {
            employeeId: 1,
            name: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            departmentId: 1,
            roleId: 1,
        },
        {
            employeeId: 2,
            name: 'Priya Singh',
            email: 'priya.singh@example.com',
            departmentId: 2,
            roleId: 2,
        },
        {
            employeeId: 3,
            name: 'Ankit Verma',
            email: 'ankit.verma@example.com',
            departmentId: 1,
            roleId: 3,
        },
      ]
    retrieveAllEmployees.mockReturnValue(employeesData)
    let res = await request(server).get('/employees');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(employeesData)
    expect(employeesData.length).toBe(3);
  });

  it('should retrive employee by id with 200 status code', async () => {
    let employee = {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
    }
    retriveEmployeeById.mockReturnValue(employee);
    let res = await request(server).get('/employees/details/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(employee);
  });
  
});

describe("Functions Test", () => {

  it('should retrive all employees', () => {
    let employeesData = [
        {
            employeeId: 1,
            name: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            departmentId: 1,
            roleId: 1,
        },
        {
            employeeId: 2,
            name: 'Priya Singh',
            email: 'priya.singh@example.com',
            departmentId: 2,
            roleId: 2,
        },
        {
            employeeId: 3,
            name: 'Ankit Verma',
            email: 'ankit.verma@example.com',
            departmentId: 1,
            roleId: 3,
        },
      ]
    retrieveAllEmployees.mockReturnValue(employeesData);
    expect(retrieveAllEmployees()).toEqual(employeesData);
  });
  
})