// Load the current booking from localStorage
let currentBooking = JSON.parse(localStorage.getItem('currentBooking'));

// Check if currentBooking exists
if (currentBooking) {
    // Display the booking details and generate a booking reference number
    const bookingDetailsList = document.getElementById('booking-details');
    currentBooking.forEach(ticket => {
        const listItem = document.createElement('li');
        listItem.textContent = `${ticket.title} - ${ticket.quantity} seat(s) - $${ticket.price * ticket.quantity}`;
        bookingDetailsList.appendChild(listItem);
    });

    // Generate a random booking reference number
    const bookingReference = `#${Math.floor(Math.random() * 1000000)}`;
    document.getElementById('booking-reference').textContent = bookingReference;

    // Calculate and display the total price
    const totalPrice = currentBooking.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0);
    document.getElementById('total-price').textContent = totalPrice;
} else {
    alert("No booking details found.");
}

// Handle form submission
document.getElementById('checkout-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Check if all fields are filled
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (name && email && paymentMethod) {
        // Display the thank you message and hide the form
        document.getElementById('checkout-form').style.display = 'none';
        document.getElementById('thank-you-message').style.display = 'block';

        // Save the order to local storage as a completed order (optional)
        const orderDetails = {
            name,
            email,
            paymentMethod,
            bookingReference: document.getElementById('booking-reference').textContent,
            bookingDetails: currentBooking
        };

        localStorage.setItem('completedOrder', JSON.stringify(orderDetails));

        alert('Your payment was successful! Thank you for your purchase.');
    } else {
        alert('Please fill in all the fields.');
    }
});
