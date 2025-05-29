const signInContent = document.querySelector('.sign-in__content');
const signUpContent = document.querySelector('.sign-up-content');
const signUp = document.querySelector('#sign-up');
const forms = document.querySelectorAll('form');
const signUpNow = document.querySelector('#sign-up-now');
const signUpMailInput = document.querySelector('#sign-up-mail');
const signUpPassInput = document.querySelector('#sign-up-pass');
const signUpPassCheckInput = document.querySelector('#sign-up-pass-check');
const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm;
let email = signUpMailInput.value.trim();
let pass = signUpPassInput.value.trim();
let user;
let dataRes;
const signInBtn = document.querySelector('#sign-in-btn');
const signInEmailInput = document.querySelector('#sign-in-email');
const signInPassInput = document.querySelector('#sign-in-pass');
const signInError=document.querySelector('#sign-in-error');


function checkLogin(){
signInBtn.addEventListener('click',()=>{
    const emailInput=signInEmailInput.value.trim();
    const passInput=signInPassInput.value.trim();
    const findUser=dataRes.find((user)=>{
      return emailInput===user.email&&passInput===user.pass
    })
    if(findUser){
        window.location.href ='file:///D:/ITI/movieApp%20project/movieApp%20home%20page/index.html';
    }else
    {
    signInError.textContent='Invalid email or password.'
    }
})
}


(async () => {
    await getData();
    checkLogin()
})();

forms.forEach((form) => {
    form.addEventListener('submit', (e) => { e.preventDefault(); })
})
signUp.addEventListener('click', (e) => {
    e.preventDefault();
    signInContent.classList.add('d-none');
    signUpContent.classList.add('d-block');
})
signUpNow.addEventListener('click', (e) => {
    e.preventDefault();
    validateSignUpForm();
})

async function getData() {
    const data = await fetch('http://localhost:3000/user-data');
    dataRes = await data.json();
    console.log(dataRes);
}


function createObj(email, pass) {
    user = { email, pass }
}
function validatePass() {
    pass = signUpPassInput.value.trim();
    const passError = document.querySelector('#pass-error');
    if (!passRegex.test(pass)) {
        passError.textContent = 'Password must be at least 8 characters and contain uppercase, lowercase, number, and special character.';
        return false;
    } else {
        passError.textContent = '';
        return true
    }
}

function validateEmail() {
    email = signUpMailInput.value.trim();
    const emailError = document.querySelector('#email-error');
    const eamilRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (!eamilRegex.test(email)) {
        emailError.textContent = 'Invalid email address.';
        return false;
    } else {
        emailError.textContent = '';
        return true
    }
}
function validateConfirmPass() {
    const pass = signUpPassInput.value.trim();
    const confirmPass = signUpPassCheckInput.value.trim();
    const passErrorCheck = document.querySelector('#pass-check-error');
    if (pass !== confirmPass) {
        passErrorCheck.textContent = 'Passwords do not match.';
        return false;
    } else {
        passErrorCheck.textContent = '';
        return true
    }




}
function validateSignUpForm() {

    const validPass = validatePass();
    const validEmail = validateEmail();
    const validConfirm = validateConfirmPass();
    if (validPass && validEmail && validConfirm) {
        createObj(email, pass)
        try {
            fetch('http://localhost:3000/user-data', {
                method: 'POST',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
        } catch (error) {
            console.log(error);

        }
        signInContent.classList.add('d-block');
        signUpContent.classList.add('d-none');
    }


}

