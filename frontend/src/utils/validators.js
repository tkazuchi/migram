const validSignupBody = (body) => {
    return body.username && body.email && body.firstName && body.lastName && body.password
}

export default {
    validSignupBody: validSignupBody
}