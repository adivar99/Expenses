export function getAsUser(userObject) {
    // console.log("userObject: ", user)
    const data = {
        id: userObject.id,
        name: userObject.name,
        username: userObject.username,
        email: userObject.email
    }
    return data
}