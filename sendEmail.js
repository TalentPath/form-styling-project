// Your code to validate your form and send the email will go here!
// All Fields are required for submission
// Make sure the Password and Confirm Password Match

// Let the user know if the passwords to not match
// Also let the user know when the email has been successfully sent

let fname;
let lname;
let email;
let pwd;
let pwdc;
let form;
let inputArr;
let btn;
let errMap;

function main()
{
    form = document.querySelector("form");

    fname = form.children[0].children[1];
    lname = form.children[1].children[1];
    email = form.children[2].children[1];
    pwd = form.children[3].children[1];
    pwdc = form.children[4].children[1];
    btn = form.children[5];

    inputArr = [fname, lname, email, pwd, pwdc];

    inputArr.forEach(item=>{
        item.addEventListener("input", evt=> evt.target.nextElementSibling.innerHTML = "")
    });

    errMap = new Map();
    errMap.set(fname, "Please enter a first name!");
    errMap.set(lname, "Please enter a last name!");
    errMap.set(email, "Please enter an email!");
    errMap.set(pwd, "Please enter a password!");
    errMap.set(pwdc, "Please confirm your password!");
}

function anyFieldsEmpty()
{
    return inputArr.some(item=> item.value === "");
}

function checkEmail()
{
    // The following comes from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    var re = /^\S+@\S+\.\S+$/;
    return !re.test(email.value);
}

document.addEventListener("DOMContentLoaded", main);

document.querySelector(".btn").addEventListener("click", evt =>
{
    evt.preventDefault();
    if (anyFieldsEmpty())
    {
        inputArr.forEach(item=> {
                if (item.value === "") item.nextElementSibling.innerHTML = errMap.get(item);
        });
    }
    else if (checkEmail())
    {
        email.nextElementSibling.innerHTML = "Please enter a valid email address!";
    }
    else if (pwd.value !== pwdc.value)
    {
        pwdc.nextElementSibling.innerHTML = "Passwords do not match!";
    }
    else
    {
        // This is the only error message that can be "corrected" by changing another input field,
        // and so we need this hard-coded here to cover all cases
        pwdc.nextElementSibling.innerHTML = "";

        btn.innerHTML = 'Creating Account...';

        fname.name = "to_name";
        email.name = "to_email";

        const serviceID = 'default_service';
        const templateID = 'template_qp43uzb';

        emailjs.sendForm(serviceID, templateID, form)
            .then(() => {
            btn.innerHTML = 'Email Sent!';
            btn.nextElementSibling.innerHTML = "Signed Up Successfully!";
            }, (err) => {
                email.nextElementSibling.innerHTML = "Please enter a valid email address!";
                btn.innerHTML = "Sign Up";
            });
        }
});