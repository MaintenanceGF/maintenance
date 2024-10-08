let url = "https://maintenance-maintenance-server.turso.io/v2/pipeline";
let authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjA2OTE2MTAsImlkIjoiZjk1YzJlMDItMTQwZi00MWZiLTgzNzEtODQ0Zjc5ZWYyZmQ2In0.2LvBX9yWMywa9uhaAJW96hNAMuk8CzXHlciNi6ImZhyXp1BGmZfh5gpS08ZhyER4Z2AkvILyEOxeTyiywarxAQ";

let sentence;

function read() {
    fetch(url, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        requests: [
            { type: "execute", stmt: { sql: sentence } },
            { type: "close" },
        ], 
        })
    })
    .then((res) => res.json())
    .then((data) => { 
  
      const dataRows = data.results[0].response.result.rows;
  
      const tb = document.getElementById('table1');
      const cellNames = ['cell1', 'cell2', 'cell3', 'cell4', 'cell5'];
  
      dataRows.forEach(function(dataTB) {
        const fila = tb.insertRow();
        for (let i = 0; i < cellNames.length; i++) {
          const cell = fila.insertCell(i);
          cell.textContent = dataTB[i].value;
        }
      });
    })
    .catch((err) => console.log(err));
};

function load_warehouse() {
  const tableSelect = document.getElementById("table1");
  const rows = tableSelect.querySelectorAll("tbody tr");
  rows.forEach(rowN => {
      rowN.style.display = "none";
  });
  sentence = `SELECT * FROM almacen`;
  read();
};

function create() {
    const location = document.getElementById('c-location').value;
    const code = document.getElementById('c-code').value;
    const description = document.getElementById('c-description').value;
    const quantity = document.getElementById('c-quantity').value;

    const sentence = `INSERT INTO almacen (location, code, description, quantity) VALUES ("${location}", "${code}", "${description}", ${quantity})`;
    const sentence_2 = `INSERT INTO actividades (date_activity, description) VALUES ("${new Date()}","${"Usuario ingreso codigo " + code}")`;

    fetch(url, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        requests: [
            { type: "execute", stmt: { sql: sentence } },
            { type: "execute", stmt: { sql: sentence_2 } },
            { type: "close" },
        ],
        })
    })
    .then(response => response.json())
    .then(data => {console.log(data);})
    .catch((err) => console.log(err));

    alert('Item ingresado');
};

function delete_() {

    const no_ = document.getElementById('d-no').value;

    const sentence1 = `DELETE FROM almacen WHERE no_ = ${no_}`;
    const sentence2 = `INSERT INTO actividades (date_activity, description) VALUES ("${new Date()}","${"Usuario elimino registro " + no_}")`;

    fetch(url, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        requests: [
            { type: "execute", stmt: { sql: sentence1 } },
            { type: "execute", stmt: { sql: sentence2 } },
            { type: "close" },
        ],
        }) 
    })
    .then(response => response.json())
    .then(data => {console.log(data);})
    .catch((err) => console.log(err));
    
    alert('Item eliminado');

};

function search() {

    const no_ = document.getElementById('u-no').value;
    const location = document.getElementById('u-location');
    const code = document.getElementById('u-code');
    const description = document.getElementById('u-description');
    const quantity = document.getElementById('u-quantity');
  
    const sentence1 = `SELECT * FROM almacen WHERE no_ = ${no_}`
  
    fetch(url, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        requests: [
            { type: "execute", stmt: { sql: sentence1 } },
            { type: "close" },
        ],
        }) 
    })
    .then(response => response.json())
    .then(data => {
        const result1 = data.results[0].response.result.rows[0];
        location.value = result1[1].value;
        code.value = result1[2].value;
        description.value = result1[3].value;
        quantity.value = result1[4].value;
    })
    .catch((err) => console.log(err));
  
  };
  
  function update() {

    const no_ = document.getElementById('u-no').value;
    const location = document.getElementById('u-location').value;
    const code = document.getElementById('u-code').value;
    const description = document.getElementById('u-description').value;
    const quantity = document.getElementById('u-quantity').value;
    
    const sentence1 = `UPDATE almacen 
    SET 
    location = "${location}",
    code = "${code}",
    description = "${description}",
    quantity = ${quantity}
    WHERE no_ = ${no_}`;

    const sentence2 = `INSERT INTO actividades (date_activity, description) VALUES ("${new Date()}","${"Usuario actualizo registro " + no_}")`;
   
    fetch(url, {
    method: "POST",
    headers: {  
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        requests: [
            { type: "execute", stmt: { sql: sentence1 } },
            { type: "execute", stmt: { sql: sentence2 } },
            { type: "close" },
        ],
        }) 
    })
    .then(response => response.json())
    .then(data => { console.log(data)})
    .catch((err) => console.log(err));
  
    alert('Registro actualizado');
  };

  function create_form() {
    document.getElementById('id-container-create').style.visibility="visible";
  };
  
  function update_form(){
    document.getElementById('id-container-update').style.visibility="visible";
  };
  
  function delete_form() {
    document.getElementById('id-container-delete').style.visibility="visible";
  };

  function cancel_formCreate() {
    document.getElementById('id-container-create').style.visibility="hidden";
  };
  
  function cancel_formUpdate(){ 
  
    const no_ = document.getElementById('u-no');
    const location = document.getElementById('u-location');
    const code = document.getElementById('u-code');
    const description = document.getElementById('u-description');
    const quantity = document.getElementById('u-quantity');
  
    no_.value = "";
    location.value = "";
    code.value = "";
    description.value = "";
    quantity.value = "";
    
    document.getElementById('id-container-update').style.visibility="hidden";
  };
  
  function cancel_formDelete() {
    document.getElementById('id-container-delete').style.visibility="hidden";
  }; 