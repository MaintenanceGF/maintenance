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
      const cellNames = ['cell1', 'cell2'];
  
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


function load_activities() {
    const tableSelect = document.getElementById("table1");
    const rows = tableSelect.querySelectorAll("tbody tr");
    rows.forEach(rowN => {
        rowN.style.display = "none";
    });
    sentence = `SELECT * FROM actividades`;
    read();
  };