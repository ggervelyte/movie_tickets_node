module.exports = () => {
    const seats = []
    for (let i = 0; i < 15; i++) {
        seats.push({
            id: i,
            reservedBy: "",
            price: 7.99
        })
    }
    return seats
}