function createEmployeeCard(employee) {
  let nameElement = document.createElement('div');
  nameElement.classList.add('name');
  let imgElement = document.createElement('img');
  imgElement.setAttribute('src', './images/icon_edit.png');
  imgElement.setAttribute('onclick', 'editEmployee(' + employee.id + ')');
  nameElement.appendChild(imgElement);
  let nameText = document.createTextNode(employee.lastName + ', ' + employee.firstName);
  nameElement.appendChild(nameText);

  let departmentElement = document.createElement('div');
  let departmentText = document.createTextNode(employee.department);
  departmentElement.appendChild(departmentText);

  let payElement = document.createElement('div');
  let payText = document.createTextNode('$' + employee.payAmount + ' ' + employee.pay);
  payElement.appendChild(payText);

  let typeElement = document.createElement('div');
  let typeText = document.createTextNode(employee.type);
  typeElement.appendChild(typeText);

  let wrapper = document.createElement('div');
  wrapper.classList.add('wrapper', 'card');
  wrapper.appendChild(nameElement);
  wrapper.appendChild(departmentElement);
  wrapper.appendChild(payElement);
  wrapper.appendChild(typeElement);

  return wrapper;
}

function displayEmployee(employee) {
  document.querySelector('main').appendChild(createEmployeeCard(employee));
}  

employees.forEach(displayEmployee);

let currentLayout = 'card';

function layout(layout) {
  if (layout.id === currentLayout) {
    // do nothing
  } else {
    currentLayout = layout.id;
    document.querySelectorAll('main .wrapper').forEach(function(employeeInfo){
      employeeInfo.classList.remove('list', 'card');
      employeeInfo.classList.add(currentLayout);
    })
  }
}

function newEmployee() {
  document.querySelector('.form').style.display='grid';
  document.getElementById('id').value = '';
  document.getElementById('first-name').value = '';
  document.getElementById('last-name').value = '';
  document.getElementById('department').value = '';
  document.getElementById('hourly').checked = true;
  document.getElementById('pay-amount').value = '';
  document.getElementById('Staff').checked = true;
}

function getEmployee(id) {
  return employees.find( (employee) => {return employee.id === id} );
}

function editEmployee(id) {
  document.querySelector('.form').style.display='grid';
  let employee = getEmployee(id);
  document.getElementById('id').value = employee.id;
  document.getElementById('first-name').value = employee.firstName;
  document.getElementById('last-name').value = employee.lastName;
  document.getElementById('department').value = employee.department;
  document.getElementById(employee.pay).checked = true;
  document.getElementById('pay-amount').value = employee.payAmount;
  document.getElementById(employee.type).checked = true;
}

function submitForm(event) {
  event.preventDefault();
  let employee = {
    id: document.getElementById('id').value,
    firstName: document.getElementById('first-name').value,
    lastName: document.getElementById('last-name').value,
    department: document.getElementById('department').value,
    pay: document.querySelector('input[name="pay"]:checked').id,
    payAmount: parseFloat(document.getElementById('pay-amount').value),
    type: document.querySelector('input[name=type]:checked').id
  }
  upsertEmployees(employee);
  document.querySelector('.form').style.display='none';
}

function upsertEmployees(employee) {
  employee.id ? updateEmployee(employee) : insertEmployee(employee);
}

function updateEmployee(employee) {
  // console.log(employee.id);
  // employees.forEach((record) => { console.log(record.id)});
  let foundEmployee = employees.find( (record) => { return record.id === parseInt(employee.id)});
  console.log('foundEmployee', foundEmployee);
  foundEmployee.firstName = employee.firstName;
  foundEmployee.lastName = employee.lastName;
  foundEmployee.department = employee.department;
  foundEmployee.pay = employee.pay;
  foundEmployee.payAmount = parseFloat(employee.payAmount);
  foundEmployee.type = employee.type;
}

function insertEmployee(employee) {
  console.log('inserting employee');
  employee.id = employees[employees.length-1].id + 1;
  employees.push(employee);
  console.table(employees);
}

function cancelForm() {
  document.querySelector('.form').style.display='none';
}