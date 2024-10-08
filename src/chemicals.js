let url = "https://maintenance-maintenance-server.turso.io/v2/pipeline";
let authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjA2OTE2MTAsImlkIjoiZjk1YzJlMDItMTQwZi00MWZiLTgzNzEtODQ0Zjc5ZWYyZmQ2In0.2LvBX9yWMywa9uhaAJW96hNAMuk8CzXHlciNi6ImZhyXp1BGmZfh5gpS08ZhyER4Z2AkvILyEOxeTyiywarxAQ";

let sentence;

function filter_day() {
  const day_ = document.getElementById('find_date').value;
  const tableSelect = document.getElementById("table1");
  const rows = tableSelect.querySelectorAll("tbody tr");
  rows.forEach(rowN => {
      rowN.style.display = "none";
  });
  sentence = `SELECT * FROM quimicos WHERE request_date = '${day_}' ORDER BY team ASC`;
  read();
};

function filter_month() {
  const month_ = document.getElementById('find_month').value;
  const tableSelect = document.getElementById("table1");
  const rows = tableSelect.querySelectorAll("tbody tr");
  rows.forEach(rowN => {
      rowN.style.display = "none";
  });
  sentence = `SELECT * FROM quimicos WHERE month_ = '${month_}' ORDER BY request_date ASC, team ASC`;
  read();
};

function load_chemicals() {
  const tableSelect = document.getElementById("table1");
  const rows = tableSelect.querySelectorAll("tbody tr");
  rows.forEach(rowN => {
      rowN.style.display = "none";
  });
  sentence = `SELECT * FROM quimicos ORDER BY request_date ASC`;
  read();
};

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
      const cellNames = ['cell1', 'cell2', 'cell3', 'cell4', 'cell5', 'cell6', 'cell7', 'cell8', 'cell9', 'cell10', 'cell11', 'cell12', 'cell13', 'cell14', 'cell15', 'cell16'];
  
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

function create() {

    const folio = document.getElementById('c-folio').value;
    const code = document.getElementById('c-code').value;
    const quantity = document.getElementById('c-quantity').value;
    const line = document.getElementById('c-line').value;
    const request_date = document.getElementById('c-request_date').value;
    const requester = document.getElementById('c-requester').value;
    const authorized = document.getElementById('c-authorized').value;

    const sentence1 = `INSERT INTO quimicos (folio, code, quantity, line, request_date, requester, authorized) VALUES (${folio}, "${code}", ${quantity}, "${line}", "${request_date}", "${requester}", "${authorized}")`;
    const sentence2 = `INSERT INTO actividades (date_activity, description) VALUES ("${new Date()}","${"Usuario ingreso vale " + folio}")`;

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

    alert('Vale ingresado');
};

function delete_() {

    const no_ = document.getElementById('d-no').value;

    const sentence1 = `DELETE FROM quimicos WHERE no_ = ${no_}`
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
    
    alert('Vale eliminado');

};

function search() {

    const no_ = document.getElementById('u-no').value;
    const folio = document.getElementById('u-folio');
    const code = document.getElementById('u-code');
    const quantity = document.getElementById('u-quantity');
    const line = document.getElementById('u-line');
    const request_date = document.getElementById('u-request_date');
    const requester = document.getElementById('u-requester');
    const authorized = document.getElementById('u-authorized');
    
    const sentence1 = `SELECT * FROM quimicos WHERE no_ = ${no_}`
  
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
        folio.value = result1[1].value;
        code.value = result1[2].value;
        quantity.value = result1[4].value;
        line.value = result1[7].value;
        request_date.value = result1[9].value;
        requester.value = result1[10].value;
        authorized.value = result1[11].value;
    })
    .catch((err) => console.log(err));
  
  };

  function update() {

    const no_ = document.getElementById('u-no').value;
    const folio = document.getElementById('u-folio').value;
    const code = document.getElementById('u-code').value;
    const quantity = document.getElementById('u-quantity').value;
    const line = document.getElementById('u-line').value;
    const request_date = document.getElementById('u-request_date').value;
    const requester = document.getElementById('u-requester').value;
    const authorized = document.getElementById('u-authorized').value;
    
    const sentence1 = `UPDATE quimicos 
    SET 
    folio = ${folio},
    code = '${code}',
    quantity = ${quantity},
    line = '${line}',
    request_date = '${request_date}',
    requester = '${requester}',
    authorized = '${authorized}'
    WHERE no_ = ${no_}`;

    const sentence2 = `INSERT INTO actividades (date_activity, description) VALUES ("${new Date()}","${"Usuario actualizo vale " + folio}")`;
   
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

  function create_report() {
    document.getElementById('id-container-report').style.visibility="visible";
  };

  function cancel_formCreate() {
    document.getElementById('id-container-create').style.visibility="hidden";
  };

  function cancel_report() {
    document.getElementById('id-container-report').style.visibility="hidden";
  };
  
  function cancel_formUpdate(){ 
  
    const no_ = document.getElementById('u-no');
    const folio = document.getElementById('u-folio');
    const code = document.getElementById('u-code');
    const quantity = document.getElementById('u-quantity');
    const line = document.getElementById('u-line');
    const request_date = document.getElementById('u-request_date');
    const requester = document.getElementById('u-requester');
    const authorized = document.getElementById('u-authorized');
  
    no_.value = "";
    folio.value = "";
    code.value = "";
    quantity.value = "";
    line.value = "";
    request_date.value = "";
    requester.value = "";
    authorized.value = "";
    
    document.getElementById('id-container-update').style.visibility="hidden";
  };
  
  function cancel_formDelete() {
    document.getElementById('id-container-delete').style.visibility="hidden";
  };

  function sum_Day() {
    const dayReport = document.getElementById('day-report1').value;
    const total_day_i = document.getElementById('total-report1');
    const team1_day_i = document.getElementById('team1-report1');
    const team2_day_i = document.getElementById('team2-report1');
    const mtto_day_i = document.getElementById('mtto-report1');

    const sentence = `
    SELECT SUM(CASE WHEN request_date = '${dayReport}' THEN total_price ELSE 0 END) AS total_day,
    SUM(CASE WHEN request_date = '${dayReport}' AND team = 1 THEN total_price ELSE 0 END) AS team1_day,
    SUM(CASE WHEN request_date = '${dayReport}' AND team = 2 THEN total_price ELSE 0 END) AS team2_day,
    SUM(CASE WHEN request_date = '${dayReport}' AND team = 3 THEN total_price ELSE 0 END) AS mtto_day FROM quimicos`

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
      .then(response => response.json())
      .then(data => {
        
        const sums = data.results[0].response.result.rows[0];

        total_day_i.value = sums[0].value;
        team1_day_i.value = sums[1].value;
        team2_day_i.value = sums[2].value;
        mtto_day_i.value = sums[3].value;
        
      })
      .catch((err) => console.log(err));

  };
  
  function sum_Month() {
    const monthReport = document.getElementById('month-report2').value;
    const total_month_i = document.getElementById('total-report2');
    const team1_month_i = document.getElementById('team1-report2');
    const team2_month_i = document.getElementById('team2-report2');
    const mtto_month_i = document.getElementById('mtto-report2');
    const sentence = `
    SELECT SUM(CASE WHEN month_ = '${monthReport}' THEN total_price ELSE 0 END) AS total_month,
    SUM(CASE WHEN month_ = '${monthReport}' AND team = 1 THEN total_price ELSE 0 END) AS team1_month,
    SUM(CASE WHEN month_ = '${monthReport}' AND team = 2 THEN total_price ELSE 0 END) AS team2_month,
    SUM(CASE WHEN month_ = '${monthReport}' AND team = 3 THEN total_price ELSE 0 END) AS mtto_month FROM quimicos`

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
      .then(response => response.json())
      .then(data => {

        const sums = data.results[0].response.result.rows[0];

        total_month_i.value = sums[0].value;
        team1_month_i.value = sums[1].value;
        team2_month_i.value = sums[2].value;
        mtto_month_i.value = sums[3].value;
    
      })
      .catch((err) => console.log(err));
  };