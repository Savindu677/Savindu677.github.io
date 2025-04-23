// Array to hold selected tickets (cart)
let selectedTickets = [];

// Function to add tickets to the cart
function addTicket(movieTitle, price, quantityId) {
    const quantity = document.getElementById(quantityId).value;
    const existingTicket = selectedTickets.find(ticket => ticket.title === movieTitle);

    if (existingTicket) {
        existingTicket.quantity += parseInt(quantity);
    } else {
        selectedTickets.push({ title: movieTitle, price: price, quantity: parseInt(quantity) });
    }

    alert(`${movieTitle} - ${quantity} tickets added to your cart.`);
    renderTicketTable();
}

// Function to render the ticket table
function renderTicketTable() {
    const ticketTableBody = document.querySelector("#ticket-table tbody");
    ticketTableBody.innerHTML = selectedTickets.map(ticket => `
        <tr>
            <td>${ticket.title}</td>
            <td>${ticket.quantity}</td>
            <td>$${ticket.price}</td>
            <td>$${ticket.price * ticket.quantity}</td>
        </tr>
    `).join('');

    const totalPrice = selectedTickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0);
    document.getElementById("total-price").innerText = totalPrice;

    // Disable "Save as Favourite" button if cart is empty
    if (selectedTickets.length === 0) {
        document.getElementById("save-favorite-btn").disabled = true;
    } else {
        document.getElementById("save-favorite-btn").disabled = false;
    }
}

// Save the current booking as a favourite in local storage
function saveFavoriteBooking() {
    if (selectedTickets.length === 0) {
        alert("You cannot save an empty cart as a favourite.");
        return;
    }
    localStorage.setItem('favoriteBooking', JSON.stringify(selectedTickets));
    alert("Your booking has been saved as a favourite.");
}

// Apply the saved favourite booking from local storage
function applyFavoriteBooking() {
    const favorite = JSON.parse(localStorage.getItem('favoriteBooking'));
    if (favorite) {
        selectedTickets = favorite;
        renderTicketTable();
        alert("Favourite booking applied successfully!");
    } else {
        alert("No favourite booking found.");
    }
}

// Checkout action (redirects to checkout.html)
function checkout() {
    if (selectedTickets.length > 0) {
        // Save current booking before checkout
        localStorage.setItem('currentBooking', JSON.stringify(selectedTickets));
        window.location.href = "checkout.html"; // Redirect to checkout page
    } else {
        alert("Please select at least one movie.");
    }
}

// Clear the cart (only removes selected tickets, not the saved favourites)
function clearCart() {
    selectedTickets = [];
    renderTicketTable();
    alert("Cart has been cleared. Your favourite booking is still saved.");
}

// Event listeners for checkout and clear buttons
document.getElementById("checkout-btn").addEventListener("click", checkout);
document.getElementById("clear-btn").addEventListener("click", clearCart);

// Event listener for applying favourite
document.getElementById("apply-favorite-btn").addEventListener("click", applyFavoriteBooking);

// Event listener for saving favourite
document.getElementById("save-favorite-btn").addEventListener("click", saveFavoriteBooking);

// Initialize the page
renderMovies();
