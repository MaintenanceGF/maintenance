let url = "https://maintenance-maintenance-server.turso.io/v2/pipeline";
let authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjA2OTE2MTAsImlkIjoiZjk1YzJlMDItMTQwZi00MWZiLTgzNzEtODQ0Zjc5ZWYyZmQ2In0.2LvBX9yWMywa9uhaAJW96hNAMuk8CzXHlciNi6ImZhyXp1BGmZfh5gpS08ZhyER4Z2AkvILyEOxeTyiywarxAQ";

const button1 = document.getElementById('my_button');

button1.onclick = function() {

  const user1 = document.getElementById('my_user').value;
  const password1 = document.getElementById('my_password').value;
  const sentence1 = `SELECT * FROM usuarios WHERE user_name = "${user1}"`;

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

      const findUser = data.results[0].response.result.rows[0];
      const findPassword = findUser[2].value;
      
      if(password1 === findPassword) {
        location.href = 'pages/main.html';
      } else {
        alert('Contraseña incorrecta');
      }
      
    })
    .catch((err) => console.log(err));

};  
