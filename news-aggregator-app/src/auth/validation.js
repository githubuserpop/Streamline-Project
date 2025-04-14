const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const lastname_input = document.getElementById('lastname-input');
const username_input = document.getElementById('username-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
    let errors = [];

    if(firstname_input && lastname_input){
        //if we have a firstname and lastname input we are in the signup
        errors = getSignupFormErrors(firstname_input.value, lastname_input.value, username_input.value, email_input.value, password_input.value, repeat_password_input.value);
    }
    else{
        //if we don't have a firstname and lastname input than we are in the login
        errors = getLoginFormErrors(username_input.value, email_input.value, password_input.value);
    }

    if(errors.length > 0){
        e.preventDefault();
       error_message.innerText = errors.join(". ");
    }
})

function getSignupFormErrors(firstname, lastname, username, email, password, repeatPassword){
    let errors = [];
    if(firstname === '' || firstname == null){
        errors.push('First name is required');
        firstname_input.parentElement.classList.add('incorrect');
    }
    if(lastname === '' || lastname == null){
        errors.push('Last name is required');
        lastname_input.parentElement.classList.add('incorrect');
    }
    if(username == '' || username == null){
        errors.push('Username is required');
        username_input.parentElement.classList.add('incorrect');
    }
    if(email === '' || email == null){
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if(password === '' || password == null){
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }
    if(username.length < 2){
        errors.push('Username must be more than 3 characters');
        username_input.parentElement.classList.add('incorrect');
    }
    if(password.length < 8){
        errors.push('Password must have at least 8 characters');
        password_input.parentElement.classList.add('incorrect');
    }
    if(password !== repeatPassword){
        errors.push('Passwords do not match');
        password_input.parentElement.classList.add('incorrect');
        repeat_password_input.parentElement.classList.add('incorrect');
    }
    return errors;
}

function getLoginFormErrors(username, email, password){
    let errors = [];
    if(username == '' || username == null){
        errors.push('Username is required');
        username_input.parentElement.classList.add('incorrect');
    }
    if(email === '' || email == null){
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if(password === '' || password == null){
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }
    // TODO!!!! CONNECT USERNAME AND PASSWORD CHECKING TO DB
    if(username.length < 2){
        errors.push('Username does not match');
        username_input.parentElement.classList.add('incorrect');
    }
    if(password.length < 8){
        errors.push('Password is incorrect');
        password_input.parentElement.classList.add('incorrect');
    }
    return errors;
}

const allInputs = [firstname_input, lastname_input, username_input, email_input, password_input, repeat_password_input].filter(input => input != null);
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect');
            error_message.innerText = '';
        }
    })
})