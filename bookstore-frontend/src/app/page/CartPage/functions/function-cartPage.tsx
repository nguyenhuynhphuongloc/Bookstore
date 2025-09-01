

const addToCart = (book: Book) => {
    setCart((prev) => {
        const exist = prev.find((item) => item.book.id === book.id)
        if (exist) {
            return prev.map((item) =>
                item.book.id === book.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        }
        return [...prev, { book, quantity: 1 }]
    })
}


const increaseQty = (id: number) => {
    setCart((prev) =>
        prev.map((item) =>
            item.book.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
    )
}


const decreaseQty = (id: number) => {
    setCart((prev) =>
        prev.map((item) =>
            item.book.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )
    )
}


const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.book.id !== id))
}


const totalPrice = cart.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
)