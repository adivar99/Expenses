export function getAsUser(userObject) {
    console.log("userObject", userObject)
    return {
        id: userObject.id,
        name: userObject.name,
        username: userObject.username,
        email: userObject.email
    }
}