
let form =document.querySelector("form");

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let px=form.querySelector("p");
    if(px){
        px.remove();
    }
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    document.getElementById('username').value="";
    document.getElementById('password').value="";
    console.log(username,password);
    try {
        console.log("here");
        const response = await fetch('http://localhost:1000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        const result = await response.text();
        console.log(result);
        if(result=="User Created"){
            console.log("User created successfully");
            window.location.href="../dist/login.html";
        }
        else{
            let errorMessage = document.createElement('p');
            errorMessage.textContent = 'Wrong username or password';
            form.appendChild(errorMessage);
        }
    } catch (error) {
        console.log('Error:', error);
    }
});