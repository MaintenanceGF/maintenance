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
      const cellNames = ['cell1', 'cell2', 'cell3', 'cell4', 'cell5', 'cell6', 'cell7', 'cell8', 'cell9', 'cell10', 'cell11', 'cell12', 'cell13'];
  
      dataRows.forEach(function(dataTB) {
        const fila = tb.insertRow();
        for (let i = 0; i < cellNames.length; i++) {
          const cell = fila.insertCell(i);
          cell.textContent = dataTB[i].value;
        }
  
        for (let i = 0; i < tb.rows.length; i++) {
          const fila = tb.rows[i];
                
          for (let j = 0; j < fila.cells.length; j++) {
            const celda = fila.cells[j];
                
            if (celda.textContent === "En tiempo") {
              celda.classList.add("status_1");
            } else if (celda.textContent === "Vencido") {
              celda.classList.add("status_2");
            } else if (celda.textContent === "Cerrado") {
              celda.classList.add('status_3');
            } else if (celda.textContent === "Sin PO") {
              celda.classList.add("tracking_1");
            } else if (celda.textContent === "Con PO") {
              celda.classList.add("tracking_2")
            }
          }
        } 
      });
    })
    .catch((err) => console.log(err));
};

function load_requisitions() {
  const tableSelect = document.getElementById("table1");
  const rows = tableSelect.querySelectorAll("tbody tr");
  rows.forEach(rowN => {
      rowN.style.display = "none";
  });
  sentence = `SELECT * FROM requisiciones WHERE delivery = 'En tiempo' OR delivery = 'Vencido' ORDER BY delivery ASC`;
  read();
};

function filter_tracking1() {
  const tableSelect = document.getElementById("table1");
  const rows = tableSelect.querySelectorAll("tbody tr");
  rows.forEach(rowN => {
      rowN.style.display = "none";
  });
  sentence = `SELECT * FROM requisiciones WHERE tracking = 'Sin PO' ORDER BY buyer ASC`;
  read();
};

function filter_tracking2() {
  const tableSelect = document.getElementById("table1");
  const rows = tableSelect.querySelectorAll("tbody tr");
  rows.forEach(rowN => {
      rowN.style.display = "none";
  });
  sentence = `SELECT * FROM requisiciones WHERE tracking = 'Con PO' ORDER BY supplier ASC, delivery ASC`;
  read();
};

function filter_status1() {
  const tableSelect = document.getElementById("table1");
  const rows = tableSelect.querySelectorAll("tbody tr");
  rows.forEach(rowN => {
      rowN.style.display = "none";
  });
  sentence = `SELECT * FROM requisiciones WHERE delivery = 'En tiempo' ORDER BY arrived_date ASC, supplier ASC`;
  read();
};

function filter_status2() {
  const tableSelect = document.getElementById("table1");
  const rows = tableSelect.querySelectorAll("tbody tr");
  rows.forEach(rowN => {
      rowN.style.display = "none";
  });
  sentence = `SELECT * FROM requisiciones WHERE delivery = 'Vencido' ORDER BY supplier ASC`;
  read();
  
};

function filter_status3() {
  const tableSelect = document.getElementById("table1");
  const rows = tableSelect.querySelectorAll("tbody tr");
  rows.forEach(rowN => {
      rowN.style.display = "none";
  });
  sentence = `SELECT * FROM requisiciones WHERE delivery = 'Cerrado'`;
  read();
};

function filter_supplier() {
  const tableSelect = document.getElementById("table1");
  const rows = tableSelect.querySelectorAll("tbody tr");
  rows.forEach(rowN => {
      rowN.style.display = "none";
  });
  const supplierF = document.getElementById('find_supplier').value;
  sentence = `SELECT * FROM requisiciones WHERE supplier LIKE '%${supplierF}%' OR supplier IS NULL ORDER BY supplier ASC, delivery ASC`;
  read();
};

function create() {

    const requisition = document.getElementById('c-requisition').value;
    const line = document.getElementById('c-line').value;
    const description = document.getElementById('c-description').value;
    const supplier = document.getElementById('c-supplier').value;
    const requester = document.getElementById('c-requester').value;
    const buyer = document.getElementById('c-buyer').value;
    const note = document.getElementById('c-note').value;

    const sentence1 = `INSERT INTO requisiciones (requisition, po, status, line, description, supplier, requester, buyer, arrived_date, tracking, progress, delivery, note) VALUES (${requisition}, 0, " ", "${line}", "${description}", "${supplier}", "${requester}", "${buyer}", " ", "Sin PO", 0, "En tiempo", "${note}")`;
    const sentence2 = `INSERT INTO actividades (date_activity, description) VALUES ("${new Date()}","${"Usuario ingreso requisicion " + requisition}")`;

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

    alert('Requisicion ingresada');
};

function delete_() {

    const requisition = document.getElementById('d-requisition').value;

    const sentence1 = `DELETE FROM requisiciones WHERE requisition = ${requisition}`;
    const sentence2 = `INSERT INTO actividades (date_activity, description) VALUES ("${new Date()}","${"Usuario elimino requisicion " + requisition}")`;

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
    
    alert('Requisicion eliminada');

};

function search() {

  const requisition = document.getElementById('u-requisition').value;
  const po = document.getElementById('u-po');
  const status = document.getElementById('u-status');
  const line = document.getElementById('u-line');
  const description = document.getElementById('u-description');
  const supplier = document.getElementById('u-supplier');
  const requester = document.getElementById('u-requester');
  const buyer = document.getElementById('u-buyer');
  const arrived_date = document.getElementById('u-arrived_date');
  const progress = document.getElementById('u-progress');
  const note = document.getElementById('u-note');

  const sentence1 = `SELECT * FROM requisiciones WHERE requisition = ${requisition}`

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
      po.value = result1[1].value;
      status.value = result1[2].value;
      line.value = result1[3].value;
      description.value = result1[4].value;
      supplier.value = result1[5].value;
      requester.value = result1[6].value;
      buyer.value = result1[7].value;
      arrived_date.value = result1[8].value;
      progress.value = result1[10].value;
      note.value = result1[12].value;
  })
  .catch((err) => console.log(err));

};   

function update() {

  const requisition = document.getElementById('u-requisition').value;
  const po = document.getElementById('u-po').value;
  const status = document.getElementById('u-status').value;
  const line = document.getElementById('u-line').value;
  const description = document.getElementById('u-description').value;
  const supplier = document.getElementById('u-supplier').value;
  const requester = document.getElementById('u-requester').value;
  const buyer = document.getElementById('u-buyer').value;
  const arrived_date = document.getElementById('u-arrived_date').value;
  const progress = document.getElementById('u-progress').value;
  const note = document.getElementById('u-note').value;
  
  const sentence1 = `UPDATE requisiciones 
  SET 
  po = ${po},
  status = '${status}',
  line = '${line}',
  description = '${description}',
  supplier = '${supplier}',
  requester = '${requester}',
  buyer = '${buyer}',
  arrived_date = '${arrived_date}',
  progress = ${progress},
  note = '${note}'
  WHERE requisition = ${requisition}`;

  const sentence2 = `INSERT INTO actividades (date_activity, description) VALUES ("${new Date()}","${"Usuario actualizo requisicion " + requisition}")`;
 
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

function create_chart() {
  document.getElementById('id-container-chart').style.visibility="visible";
};

function cancel_formCreate() {
  document.getElementById('id-container-create').style.visibility="hidden";
};

function cancel_formUpdate(){ 

  const requisition = document.getElementById('u-requisition');
  const po = document.getElementById('u-po');
  const status = document.getElementById('u-status');
  const line = document.getElementById('u-line');
  const description = document.getElementById('u-description');
  const supplier = document.getElementById('u-supplier');
  const requester = document.getElementById('u-requester');
  const buyer = document.getElementById('u-buyer');
  const arrived_date = document.getElementById('u-arrived_date');
  const progress = document.getElementById('u-progress');
  const note = document.getElementById('u-note');

  requisition.value = "";
  po.value = "";
  status.value = "";
  line.value = "";
  description.value = "";
  supplier.value = "";
  requester.value = "";
  buyer.value = "";
  arrived_date.value = "";
  progress.value = "";
  note.value = "";
  
  document.getElementById('id-container-update').style.visibility="hidden";
};

function cancel_formDelete() {
  document.getElementById('id-container-delete').style.visibility="hidden";
}; 

function cancel_chart() {
  document.getElementById('id-container-chart').style.visibility="hidden"
};

function countOrders() {
  const sentence1 = `SELECT SUM(CASE WHEN status = 'Returned' THEN 1 ELSE 0 END) AS returned,
  SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) AS rejected,
  SUM(CASE WHEN status = 'Incomplete' THEN 1 ELSE 0 END) AS incomplete,
  SUM(CASE WHEN status = 'In process' THEN 1 ELSE 0 END) AS in_process,
  SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) AS approved,
  SUM(CASE WHEN tracking = 'Sin PO' THEN 1 ELSE 0 END) AS sin_po,
  SUM(CASE WHEN tracking = 'Con PO' THEN 1 ELSE 0 END) AS con_po,
  SUM(CASE WHEN delivery = 'En tiempo' THEN 1 ELSE 0 END) AS en_tiempo,
  SUM(CASE WHEN delivery = 'Vencido' THEN 1 ELSE 0 END) AS vencido,
  SUM(CASE WHEN delivery = 'Cerrado' THEN 1 ELSE 0 END) AS cerrado
  FROM requisiciones`

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

      const counts = data.results[0].response.result.rows[0];

      let value1 = Number(counts[0].value);
      let value2 = Number(counts[1].value);
      let value3 = Number(counts[2].value);
      let value4 = Number(counts[3].value);
      let value5 = Number(counts[4].value);

      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart1);
      function drawChart1() {
          var data = google.visualization.arrayToDataTable([
              ['tracking', 'orders'],
              ['Returned', value1],
              ['Rejected', value2],
              ['Incomplete', value3],
              ['In process', value4],
              ['Approved', value5]
          ]);

          var options = {
              pieHole: 0.4,
              backgroundColor: 'transparent',
              legend: { position: 'right', textStyle: {fontSize: 10, color: '#FFFFFF'}, },
              pieSliceText: 'value', 
              fontSize:10 ,
          };

          var chart = new google.visualization.PieChart(document.getElementById('donutchart1'));
          chart.draw(data, options);
      };

      let value6 = Number(counts[5].value);
      let value7 = Number(counts[6].value);

      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart2);
      function drawChart2() {
          var data = google.visualization.arrayToDataTable([
              ['status', 'orders'],
              ['Sin PO', value6],
              ['Con PO', value7]             
          ]);
    
          var options = {
              pieHole: 0.4,
              backgroundColor: 'transparent',
              legend: { position: 'right', textStyle: {fontSize: 10, color: '#FFFFFF'}, },
              pieSliceText: 'value', 
              fontSize:10 ,
          };
    
          var chart = new google.visualization.PieChart(document.getElementById('donutchart2'));
          chart.draw(data, options);
      };

      let value8 = Number(counts[7].value);
      let value9 = Number(counts[8].value);
      let value10 = Number(counts[9].value);

      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart3);
      function drawChart3() {
          var data = google.visualization.arrayToDataTable([
              ['status', 'orders'],
              ['En tiempo', value8],
              ['Vencido', value9],
              ['Cerrado', value10]            
          ]);
    
          var options = {
              pieHole: 0.4,
              backgroundColor: 'transparent',
              legend: { position: 'right', textStyle: {fontSize: 10, color: '#FFFFFF'}, },
              pieSliceText: 'value', 
              fontSize:10 ,
          };
    
          var chart = new google.visualization.PieChart(document.getElementById('donutchart3'));
          chart.draw(data, options);
      };

  })
  .catch((err) => console.log(err));
  
}