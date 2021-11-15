
document.querySelector('#form').addEventListener('submit', e => {
    
    // Prevent default refresh
    e.preventDefault()

    // Initiate variables
    let errorMsg
    let formData = new FormData(e.target)
    let pass = formData.get('password')
    let pass2 = formData.get('password2')
    let errorText = document.querySelector('#errorMsg')
    let successText = document.querySelector('#successMsg')

    // Check password
    if(pass.length < 6) errorMsg = "The password must be at least 6 characters long"
    else if(pass != pass2) errorMsg = "The passwords don't match"
    else if(!/\d/.test(pass)) errorMsg = "The password must have 1 number"

    if(errorMsg != undefined) {
        successText.style.display = 'none'
        errorText.innerText = errorMsg
        errorText.style.display = 'block'
    }
    else { // Success - send email
        errorText.style.display = 'none'
        emailjs.send("service_iike7xf","template_5m2iexe",{
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email')
        }).then(() => {
            form.reset()
            successText.innerText = "Success! Email sent."
            successText.style.display = 'block'
        }, (err) => {
            console.error(JSON.stringify(err))
        })
    }
})
