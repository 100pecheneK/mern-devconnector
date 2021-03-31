export const makeConfig = () => {
    return {
        headers: {
            'Content-Type': 'application/json'
        }
    }
}
export const makeBody = body => JSON.stringify(body)