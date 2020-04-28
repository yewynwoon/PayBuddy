import React, { useState } from 'react';
import './client.css';
import './paybill.css';
import { getAccBalance } from './util/api-calls';

const TransferForm = props => {
    return (
        <main id='cous'>
            <div class='header-id'>
                <h2 class='header-text'>Enter transfer details</h2>
            </div>
            <div class="box">
                <div class="inner-box" id="box-body-id">
                    <form onSubmit={props.onSubmit}>
                        <div class="bpay-logo">Funds Tranfer</div>
                        <hr></hr>
                        <div class='upper-inner-box'>
                            <div class='text-line'>
                                User ID:
                                <input id='destID' type="text" placeholder=' User ID *' required/>
                            </div>
                        </div>
                        <hr></hr>
                        <div class='middle-inner-box'>
                            <div class='payment-details'>
                                <div class='payment-line'>
                                    Amount:
                                    <input id='amount' type="text" placeholder=' Amount *' required/>
                                </div>
                                <div class='payment-line'>
                                    Description:
                                    <input id='description' type="text" placeholder=' Description'/>
                                </div>
                            </div>
                        </div>
                        <div class='lower-inner-box'>
                            <button class="IzjkL _2Y_WL FiOTW continue-button"id="submit-button">
                                Confirm
                            </button>
                        </div>
                  </form>
                </div>
            </div>
        </main>
    );
}

const TransferConfirm = props => {
    return (
        <main id='cous'>
            <div id='header-id'>
                <h2 class='header-text'>Confirm your transfer</h2>
            </div>
            <div class='box'>
                <div class='inner-box' id='box-body-id'>
                <hr></hr>
                    <div class='middle-inner-box'>
                        <div class='payment-details'>
                            User ID:
                            <div class='payment-dexcription-text-box'>{props.transfer.destID.value}</div>
                        </div>
                    </div>
                    <hr></hr>
                    <div class='middle-inner-box'>
                        <div class='payment-details'>
                            Amount:
                            <div class='payment-dexcription-text-box'>${props.transfer.amount.value}</div>
                        </div>
                    </div>
                    <div class='middle-inner-box'>
                        <div class='payment-details'>
                            Description:
                            <div class='payment-dexcription-text-box'>{props.transfer.descrip.value}</div>
                        </div>
                    </div>
                    <div class='button-container'>
                        <button id="submit-button" onClick={props.onSubmit} class="_16apt _2Y_Wp">
                            <span>Transfer</span>
                        </button>
                        <button id="cancel-button" onClick={props.cancelPayment} class="_16apt _2Y_Wp">
                            <span>Cancel</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

function UserTransfer(props) {

    const [show, setShow] = useState(false);
    const [err, setErr] = useState(false);
    const [transfer, setTransfer] = useState('');
    const [api, setApi] = useState('');

    const showConfirm = () => setShow(true);
    const closeConfirm = () => {
        //debugger;
        setTransfer('');
        setShow(false);
    };

    function handleSubmit(event) {
        //debugger;
        
        event.preventDefault();
        const { destID, amount, description } = event.target.elements;
        
        setTransfer({
            userID: 1,
            destID: destID,
            amount: amount,
            descrip: description
        }); 
    
        showConfirm();
    }

       
    function validatePayment(event) {
        fetch('http://localhost:9000/transferFunds', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                src_id: '1',
                dest_id: transfer.destID.value,
                amount: transfer.amount.value,
                descrip: transfer.descrip.value
            })
        }).then(function (responseFromServer) {
            if(responseFromServer.status === 200) {
                console.log('responseFromServer');

                //Page re-route
                window.location.href = "/Dashboard?user_id=1";
            } else {
                console.log('API error');
            }
        });
    }

    return (
        <div>
            {
                !show ? <TransferForm onSubmit={handleSubmit}/>
                      : <TransferConfirm transfer={transfer}
                                         onSubmit={validatePayment}
                                         error={err}
                                         cancelPayment={closeConfirm}/>
            }
        </div>
    );
}

export default UserTransfer;