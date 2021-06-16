export const validateLoginForm = (email, password) => {

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return "Please enter valid email address!"
    } else if (!/^(?=.*?[0-9])(?=.*[+!-#$]).{6,}$/.test(password)) {
        return "Password must contain minimum 6 characters, at least one number and one special character (+,-,!,#,$)"
    }

    return ''
}

export const validateContactForm = (contact) => {
    if (!contact.firstName || !contact.lastName) {
        return 'First name and last name are required!'
    } else if (contact.firstName.length > 100) {
        return 'Max number of characters for first name is 100'
    } else if (contact.lastName.length > 300) {
        return 'Max number of characters for last name is 300'
    } else if (!contact.dateOfBirth){
        return 'Date of birth is required'
    }

    return ''
}

export const validateContactSubForm = (contact) => {
    if (!contact.contactType || !contact.contact) {
        return 'Contact type and contact are required!'
    } else if (contact.contactType === "Email" && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(contact.contact)) {
        return "Please enter valid email address!"
    }

    return ''
}