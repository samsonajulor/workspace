// Form Submit Button DOM
let submitBtn = document.getElementById('submitBtn');
console.log(submitBtn, 'submit');
// Adding event listener to form submit button
submitBtn.addEventListener('click', async (event) => {
  // Preventing form to submit
  event.preventDefault();

  // Fetching Form data

  // jQuery Ajax Post Request
  const response = await fetch('http://127.0.0.1:3333/api/v1/paypal/pay',
  {
    method: 'POST',
    body: 
    {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Red Sox Hat",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "Hat for the best team ever"
    }]
}
  }
  );

  console.log(response);
});
