const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalContainer = document.querySelector('.cart-total');
const checkoutSection = document.querySelector('.checkout-section');
const checkoutTotalContainer = document.querySelector('.checkout-total');
const receiptSection = document.querySelector('.receipt-section');
const receiptItemsContainer = document.querySelector('.receipt-items');
const receiptTotalContainer = document.querySelector('.receipt-total');

document.querySelector('.checkout').addEventListener('click', () => {
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    checkoutTotalContainer.textContent = total.toFixed(2);
    checkoutSection.style.display = 'block';
});

document.querySelector('.confirm-checkout').addEventListener('click', () => {
    const amount = parseFloat(document.querySelector('#amount').value);

    if (amount < parseFloat(checkoutTotalContainer.textContent)) {
        alert('Amount entered is less than the total amount due.');
        return;
    }

    alert('Purchase confirmed!');
    displayReceipt();
    cart.length = 0;
    updateCartUI();
    checkoutSection.style.display = 'none';
});

document.querySelector('.new-purchase').addEventListener('click', () => {
    receiptSection.style.display = 'none';
});

function updateCartUI() {
    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeFromCart(item.id);
        });

        li.appendChild(removeButton);
        cartItemsContainer.appendChild(li);

        total += item.price * item.quantity;
    });

    cartTotalContainer.textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        cart[productIndex].quantity -= 1;

        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }

        updateCartUI();
    }
}

function displayReceipt() {
    receiptItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        receiptItemsContainer.appendChild(li);

        total += item.price * item.quantity;
    });

    receiptTotalContainer.textContent = total.toFixed(2);
    receiptSection.style.display = 'block';
}
