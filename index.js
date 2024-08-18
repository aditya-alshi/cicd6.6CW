let express = require('express');
let app = express();
let { retrieveAllEmployees, retriveEmployeeById } = require('./data');

app.get('/employees', (req, res) => {
  let allEmployees = retrieveAllEmployees();
  res.status(200).json(allEmployees);
  return;
});

app.get('/employees/details/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let employee = retriveEmployeeById(id);
  res.status(200).json(employee);
  return;
});

module.exports = {
  app
}