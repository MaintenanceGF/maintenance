


const url = "https://maintenance-maintenance-server.turso.io/v2/pipeline";
    const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjA2OTE2MTAsImlkIjoiZjk1YzJlMDItMTQwZi00MWZiLTgzNzEtODQ0Zjc5ZWYyZmQ2In0.2LvBX9yWMywa9uhaAJW96hNAMuk8CzXHlciNi6ImZhyXp1BGmZfh5gpS08ZhyER4Z2AkvILyEOxeTyiywarxAQ";

    const data = "SELECT * FROM pedidos_especiales"
    
    fetch(url, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        requests: [
            { type: "execute", stmt: { sql: data } },
            { type: "close" },
        ],
        })
    })
    .then((res) => res.json())
    .then((data) => { 

        const dataRows = data.results[0].response.result.rows;

        const data1 =  
        dataRows.map (rowi => {
            return `${rowi[0].value}, ${rowi[1].value}, ${rowi[2].value}, ${rowi[3].value}, ${rowi[4].value}, ${rowi[5].value}, ${rowi[6].value}, ${rowi[7].value}, ${rowi[8].value}, ${rowi[9].value}, ${rowi[10].value}, ${rowi[11].value}, ${rowi[12].value}, ${rowi[13].value}, ${rowi[14].value}, ${rowi[15].value}`
        });
        console.log(data1);

        const tb = document.getElementById('table1');

        dataRows.forEach(function(dataTB) {
            const fila = tb.insertRow();
            const cell1 = fila.insertCell(0);
            const cell2 = fila.insertCell(1);
            const cell3 = fila.insertCell(2);
            const cell4 = fila.insertCell(3);
            const cell5 = fila.insertCell(4);
            const cell6 = fila.insertCell(5);
            const cell7 = fila.insertCell(6);
            const cell8 = fila.insertCell(7);
            const cell9 = fila.insertCell(8);
            const cell10 = fila.insertCell(9);
            const cell11 = fila.insertCell(10);
            const cell12 = fila.insertCell(11);
            const cell13 = fila.insertCell(12);
            const cell14 = fila.insertCell(13);
            const cell15 = fila.insertCell(14);
            const cell16 = fila.insertCell(15);

            cell1.textContent = dataTB[0].value
            cell2.textContent = dataTB[1].value
            cell3.textContent = dataTB[2].value
            cell4.textContent = dataTB[3].value
            cell5.textContent = dataTB[4].value
            cell6.textContent = dataTB[5].value
            cell7.textContent = dataTB[6].value
            cell8.textContent = dataTB[7].value
            cell9.textContent = dataTB[8].value
            cell10.textContent = dataTB[9].value
            cell11.textContent = dataTB[10].value
            cell12.textContent = dataTB[11].value
            cell13.textContent = dataTB[12].value
            cell14.textContent = dataTB[13].value
            cell15.textContent = dataTB[14].value
            cell16.textContent = dataTB[15].value
        });
    
        })

    .catch((err) => console.log(err));
