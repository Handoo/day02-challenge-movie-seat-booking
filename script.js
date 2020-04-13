const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

// Save selected movie and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem( 'selectedMovieIndex', movieIndex );
    localStorage.setItem( 'selectedMoviePrice', moviePrice );
}

// Function update total and count
function updateCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    // Make things ready for local storage
    const seatsIndex = [...selectedSeats].map(function(seat) {
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

// Event when a user change the ticket price
movieSelect.addEventListener('change', function(event) {
    ticketPrice = +event.target.value;
    setMovieData(event.target.selectedIndex, event.target.value);
    updateCount();
});

// Event when user click on a seat
container.addEventListener('click', function(event) {
    if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
        event.target.classList.toggle('selected');
        updateCount();
    }
    
});


