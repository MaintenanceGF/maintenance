function addData() {
    const request_date = document.getElementById('request_date').value;
    const voucher = document.getElementById('voucher').value;
    const code = document.getElementById('code').value;
    const quantity = document.getElementById('quantity').value;
    const line = document.getElementById('line').value;
    const requester = document.getElementById('requester').value;
    const authorized = document.getElementById('authorized').value;
    const buyer = document.getElementById('buyer').value;
    const note = document.getElementById('note').value


    const url = "https://maintenance-maintenance-server.turso.io/v2/pipeline";
    const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjA2OTE2MTAsImlkIjoiZjk1YzJlMDItMTQwZi00MWZiLTgzNzEtODQ0Zjc5ZWYyZmQ2In0.2LvBX9yWMywa9uhaAJW96hNAMuk8CzXHlciNi6ImZhyXp1BGmZfh5gpS08ZhyER4Z2AkvILyEOxeTyiywarxAQ";

    const data = `INSERT INTO pedidos_especiales (voucher, code, description, quantity, line, requisition, po, request_date, arrived_date, supplier, requester, authorized, buyer, note, status, open_closed) VALUES (${voucher}, "${code}", " ", ${quantity}, "${line}", " ", " ", "${request_date}", " ", " ", "${requester}", "${authorized}", "${buyer}", "${note}", " ", " ")`

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
    .then(response => response.json())
    .then(data => {console.log(data);
    })
    .catch(error => { 
        console.error('Error'. error);
    });  
};

function open_form() {
    document.getElementById('form01').style.visibility="visible";
}

function close_form() {
    document.getElementById('form01').style.visibility="hidden";
}
