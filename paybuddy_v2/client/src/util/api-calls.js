//Get User Account Balance
function getAcctBalance(userID, cb) {
    fetch('http://localhost:9000/dashboard?user_id='+userID+';')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        cb(data);
    });
}

//Get User Account Balance
function getAccBalance(userID, cb) {
    fetch('http://localhost:9000/user/acctBalance/'+userID)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        cb(data);
    });
}

function checkBPayPayment(bill, cb) {
    try {
        fetch(`http://localhost:9000/payments/validatePayment`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                userID: '1',
                payment: {
                    billerCode: bill.billerCode.value,
                    crn: bill.crn.value,
                    amount: parseFloat(bill.amount.value),
                    settlementDate: "2017-10-23",
                    paymentMethod: "001",
                    paymentDate: "2019-01-10"
                }
            })
        })
        .then((response) => {
            cb(response);
        });
    } catch {
        console.log('ERRROROROR');
    }
}

var serviceObject = {
    "getAcctBalance":getAcctBalance,
    "getAccBalance":getAccBalance,
    "checkBPayPayment":checkBPayPayment
}

module.exports = serviceObject;