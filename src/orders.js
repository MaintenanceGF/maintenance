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
      const cellNames = ['cell1', 'cell2', 'cell3', 'cell4', 'cell5', 'cell6', 'cell7', 'cell8', 'cell9', 'cell10', 'cell11', 'cell12', 'cell13', 'cell14', 'cell15', 'cell16', 'cell17', 'cell18'];
  
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
            } else if (celda.textContent === "Sin requisicion") {
              celda.classList.add("tracking_1");
            } else if (celda.textContent === "Con requisicion") {
              celda.classList.add("tracking_2");
            } else if (celda.textContent === "Con PO") {
              celda.classList.add("tracking_3")
            }
          }
        } 
      });
    })
    .catch((err) => console.log(err));
};

function filter_tracking1() {
    const tableSelect = document.getElementById("table1");
    const rows = tableSelect.querySelectorAll("tbody tr"); 
    rows.forEach(rowN => {
        rowN.style.display = "none"; 
    });
    sentence = `SELECT * FROM pedidos_especiales WHERE tracking = 'Sin requisicion'`;
    read();
};

function filter_tracking2() {
    const tableSelect = document.getElementById("table1");
    const rows = tableSelect.querySelectorAll("tbody tr");
    rows.forEach(rowN => {
        rowN.style.display = "none";
    });
    sentence = `SELECT * FROM pedidos_especiales WHERE tracking = 'Con requisicion' ORDER BY buyer ASC`;
    read();
};

function filter_tracking3() {
    const tableSelect = document.getElementById("table1");
    const rows = tableSelect.querySelectorAll("tbody tr");
    rows.forEach(rowN => {
        rowN.style.display = "none";
    });
    sentence = `SELECT * FROM pedidos_especiales WHERE tracking = 'Con PO' ORDER BY supplier ASC, status ASC`;
    read();
};

function filter_status1() {
    const tableSelect = document.getElementById("table1");
    const rows = tableSelect.querySelectorAll("tbody tr");
    rows.forEach(rowN => {
        rowN.style.display = "none";
    });
    sentence = `SELECT * FROM pedidos_especiales WHERE status = 'En tiempo' ORDER BY arrived_date ASC, supplier ASC`;
    read();
};

function filter_status2() {
    const tableSelect = document.getElementById("table1");
    const rows = tableSelect.querySelectorAll("tbody tr");
    rows.forEach(rowN => {
        rowN.style.display = "none";
    });
    sentence = `SELECT * FROM pedidos_especiales WHERE status = 'Vencido' ORDER BY supplier ASC`;
    read();
    
};

function filter_status3() {
    const tableSelect = document.getElementById("table1");
    const rows = tableSelect.querySelectorAll("tbody tr");
    rows.forEach(rowN => {
        rowN.style.display = "none";
    });
    sentence = `SELECT * FROM pedidos_especiales WHERE status = 'Cerrado' ORDER BY request_date ASC`;
    read();
};

function filter_supplier() {
    const tableSelect = document.getElementById("table1");
    const rows = tableSelect.querySelectorAll("tbody tr");
    rows.forEach(rowN => {
        rowN.style.display = "none";
    });
    const supplierF = document.getElementById('find_supplier').value;
    sentence = `SELECT * FROM pedidos_especiales WHERE supplier LIKE '%${supplierF}%' OR supplier IS NULL ORDER BY supplier ASC, status ASC`;
    read();
};

function load_orders() {
    const tableSelect = document.getElementById("table1");
    const rows = tableSelect.querySelectorAll("tbody tr");
    rows.forEach(rowN => {
        rowN.style.display = "none";
    });
    sentence = `SELECT * FROM pedidos_especiales WHERE status = 'En tiempo' OR status = 'Vencido' ORDER BY request_date ASC`;
    read();
};

function create() {

    const request_date = document.getElementById('c-request_date').value;
    const voucher = document.getElementById('c-voucher').value;
    const code = document.getElementById('c-code').value;
    const description = document.getElementById('c-description').value;
    const quantity = document.getElementById('c-quantity').value;
    const line = document.getElementById('c-line').value;
    const requester = document.getElementById('c-requester').value;
    const authorized = document.getElementById('c-authorized').value;
    const buyer = document.getElementById('c-buyer').value;
    const note = document.getElementById('c-note').value;
    const location = document.getElementById('c-location').value;

    const sentence1 = `INSERT INTO pedidos_especiales (voucher, code, description, quantity, line, requisition, po, request_date, arrived_date, supplier, requester, authorized, buyer, note, location, tracking, progress, status) VALUES (${voucher}, "${code}", "${description}", ${quantity}, "${line}", 0, 0, "${request_date}", " ", " ", "${requester}", "${authorized}", "${buyer}", "${note}", "${location}", "Sin requisicion", 0, "En tiempo")`;
    const sentence2 = `INSERT INTO actividades (date_activity, description) VALUES ("${new Date()}","${"Usuario ingreso pedido con numero de vale " + voucher}")`;


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

    alert('Pedido ingresado');
};

function delete_() {

    const voucher = document.getElementById('d-voucher').value;

    const sentence1 = `DELETE FROM pedidos_especiales WHERE voucher = ${voucher}`;
    const sentence2 = `INSERT INTO actividades (date_activity, description) VALUES ("${new Date()}","${"Usuario elimino pedido con numero de vale " + voucher}")`;

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
    
    alert('Pedido eliminado');

};

function search() {

    const voucher = document.getElementById('u-voucher').value;
    const code = document.getElementById('u-code');
    const descripcion = document.getElementById('u-description');
    const quantity = document.getElementById('u-quantity');
    const line = document.getElementById('u-line');
    const requisition = document.getElementById('u-requisition');
    const po = document.getElementById('u-po');
    const request_date = document.getElementById('u-request_date');
    const arrived_date = document.getElementById('u-arrived_date');
    const supplier = document.getElementById('u-supplier');
    const requester = document.getElementById('u-requester');
    const authorized = document.getElementById('u-authorized');
    const buyer = document.getElementById('u-buyer');
    const note = document.getElementById('u-note');
    const location = document.getElementById('u-location');
    const progress = document.getElementById('u-progress');

    const sentence1 = `SELECT * FROM pedidos_especiales WHERE voucher = ${voucher}`

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
        code.value = result1[1].value;
        descripcion.value = result1[2].value;
        quantity.value = result1[3].value;
        line.value = result1[4].value;
        requisition.value = result1[5].value;
        po.value = result1[6].value;
        request_date.value = result1[7].value;
        arrived_date.value = result1[8].value;
        supplier.value = result1[9].value;
        requester.value = result1[10].value;
        authorized.value = result1[11].value;
        buyer.value = result1[12].value;
        note.value = result1[13].value;
        location.value = result1[14].value;
        progress.value = result1[16].value;
    })
    .catch((err) => console.log(err));

};   

function update() {

    const voucher = document.getElementById('u-voucher').value;
    const code = document.getElementById('u-code').value;
    const description = document.getElementById('u-description').value;
    const quantity = document.getElementById('u-quantity').value;
    const line = document.getElementById('u-line').value;
    const requisition = document.getElementById('u-requisition').value;
    const po = document.getElementById('u-po').value;
    const request_date = document.getElementById('u-request_date').value;
    const arrived_date = document.getElementById('u-arrived_date').value;
    const supplier = document.getElementById('u-supplier').value;
    const requester = document.getElementById('u-requester').value;
    const authorized = document.getElementById('u-authorized').value;
    const buyer = document.getElementById('u-buyer').value;
    const note = document.getElementById('u-note').value;
    const location = document.getElementById('u-location').value;
    const progress = document.getElementById('u-progress').value;
    
    const sentence1 = `UPDATE pedidos_especiales 
    SET 
    code = '${code}',
    description = '${description}',
    quantity = ${quantity},
    line = '${line}',
    requisition = ${requisition},
    po = ${po},
    request_date = '${request_date}',
    arrived_date = '${arrived_date}',
    supplier = '${supplier}',
    requester = '${requester}',
    authorized = '${authorized}',
    buyer = '${buyer}',
    note = '${note}',
    location = '${location}',
    progress = ${progress}
    WHERE voucher = ${voucher}`;

    const sentence2 = `INSERT INTO actividades (date_activity, description) VALUES ("${new Date()}","${"Usuario actualizo pedido con numero de vale " + voucher}")`;
   
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
    
    const voucher = document.getElementById('u-voucher');
    const code = document.getElementById('u-code');
    const description = document.getElementById('u-description');
    const quantity = document.getElementById('u-quantity');
    const line = document.getElementById('u-line');
    const requisition = document.getElementById('u-requisition');
    const po = document.getElementById('u-po');
    const request_date = document.getElementById('u-request_date');
    const arrived_date = document.getElementById('u-arrived_date');
    const supplier = document.getElementById('u-supplier');
    const requester = document.getElementById('u-requester');
    const authorized = document.getElementById('u-authorized');
    const buyer = document.getElementById('u-buyer');
    const note = document.getElementById('u-note');
    const location = document.getElementById('u-location');
    const progress = document.getElementById('u-progress');
    
    voucher.value = "";
    code.value = "";
    description.value = "";
    quantity.value = "";
    line.value = "";
    requisition.value = "";
    po.value = "";
    request_date.value = "";
    arrived_date.value = "";
    supplier.value = "";
    requester.value = "";
    authorized.value = "";
    buyer.value = "";
    note.value = "";
    location.value = "";
    progress.value = "";
    
    document.getElementById('id-container-update').style.visibility="hidden";
};

function cancel_formDelete() {
    document.getElementById('id-container-delete').style.visibility="hidden";
}; 

function cancel_chart() {
    document.getElementById('id-container-chart').style.visibility="hidden"
};

function countOrders() {
    const sentence1 = `SELECT SUM(CASE WHEN tracking = 'Sin requisicion' THEN 1 ELSE 0 END) AS sin_requisicion,
    SUM(CASE WHEN tracking = 'Con requisicion' THEN 1 ELSE 0 END) AS con_requisicion,
    SUM(CASE WHEN tracking = 'Con PO' THEN 1 ELSE 0 END) AS con_po,
    SUM(CASE WHEN status = 'En tiempo' THEN 1 ELSE 0 END) AS en_tiempo,
    SUM(CASE WHEN status = 'Vencido' THEN 1 ELSE 0 END) AS vencido,
    SUM(CASE WHEN status = 'Cerrado' THEN 1 ELSE 0 END) AS cerrado
    FROM pedidos_especiales`

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

        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['tracking', 'orders'],
                ['Sin requisicion', value1],
                ['Con requisicion', value2],
                ['Con PO', value3],
            ]);

            var options = {
                pieHole: 0.4,
                backgroundColor: 'transparent',
                legend: { position: 'right', textStyle: {fontSize: 10, color: '#FFFFFF'}, },
                pieSliceText: 'value', 
                fontSize:10 ,
            };

            var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
            chart.draw(data, options);
        };

        let value4 = Number(counts[3].value);
        let value5 = Number(counts[4].value);
        let value6 = Number(counts[5].value);

        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart1);
        function drawChart1() {
            var data = google.visualization.arrayToDataTable([
                ['status', 'orders'],
                ['En tiempo', value4],
                ['Vencido', value5],
                ['Cerrado', value6]               
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

    })
    .catch((err) => console.log(err));
    
}
    


