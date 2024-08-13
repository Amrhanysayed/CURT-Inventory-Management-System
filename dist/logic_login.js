let pass=document.querySelector("#password");
let check=document.querySelector("#show");

check.onchange =function(e){
    pass.type=check.checked ? "text" :"password";
};
////////////////////////////////////////////////////


let form=document.querySelector("#loginForm");
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    document.getElementById('username').value="";
    document.getElementById('password').value="";

    try {
        const response = await fetch('http://localhost:1000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.text();
        if(result=="log in successfully"){
            window.location.href="../dist/dashboard.html"
        }
        else{
            let errorMessage = document.createElement('p');
            errorMessage.textContent = 'Wrong username or password';
            form.appendChild(errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    
});