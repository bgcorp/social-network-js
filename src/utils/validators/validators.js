export const required = (value) => {
    return value ? undefined : "Field is required"
}

export const maxLength = (max) => (value) => {
    return value.length < max ? undefined : "Max length " + max
}