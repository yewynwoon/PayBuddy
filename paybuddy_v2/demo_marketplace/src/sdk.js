// Render the PayPal button into #paypal-button-container
paypal.Buttons({

    // Set up the transaction
    createOrder: function(data, actions) {
        return fetch('/demo/checkout/api/paypal/order/create/', {
            method: 'post'
        }).then(function(res) {
            return res.json();
        }).then(function(data) {
            return data.orderID;
        });
    },
})