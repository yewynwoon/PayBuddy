import React, { useState } from 'react'
import {useOktaAuth} from '@okta/okta-react'
import transfer from './img/Transfericon.png'
import './paybill.css'
import './fade-in-fast.css'

const TransferForm = props => {
    return (
        <main class='fade-in-fast'>
            <h2 class='header-text'>Transfer funds to user</h2>
            <div>
                <div class="inner-box" id="box-body-id">
                    <form onSubmit={props.onSubmit}>
                        <img id='transfer-img' src={transfer}></img>
                        <div class='title'>Enter Transfer Details</div>
                        <hr class='centre-hr centre-margin' id='spaceout'></hr>
                        <div class='upper-inner-box'>
                            <div class='text-line'>
                                User ID:
                                <input id='destID' type="text" placeholder=' User ID *' required/>
                            </div>
                        </div>
                        <hr class='centre-hr centre-margin' id='spaceout'></hr>
                        <div class='middle-inner-box'>
                            <div class='payment-details'>
                                <div class='payment-line'>
                                    Amount:
                                    <input id='amount' type="text" placeholder=' Amount *' required/>
                                </div>
                                <div className='payment-line'>
                                    Description:
                                    <input id='description' type="text" placeholder=' Description'/>
                                </div>
                            </div>
                        </div>
                        <div class='lower-inner-box'>
                            <button class='orange-button' id='spaceout'>
                                <span class='button-text'>Confirm</span>
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
        <main class='fade-in-fast' id='cous'>
            <div id='header-id'>
                <h2 class='header-text'>Transfer funds to user</h2>
            </div>
            <div>
                <div class='inner-box'>
                    <img id='transfer-img' src={transfer}></img>
                    <div class='title'>Confirm Transfer Details</div>
                    <hr class='centre-hr centre-margin' id='spaceout'></hr>
                    <div class='middle-inner-box'>
                        <div class='payment-details'>
                            User ID:
                            <div className='payment-dexcription-text-box'>{props.transfer.destID.value}</div>
                        </div>
                    </div>
                    <hr class='centre-hr centre-margin' id='spaceout'></hr>
                    <div class='middle-inner-box'>
                        <div class='payment-details'>
                            Amount:
                            <div className='payment-dexcription-text-box'>${props.transfer.amount.value}</div>
                        </div>
                    </div>
                    <div className='middle-inner-box'>
                        <div className='payment-details'>
                            Description:
                            <div className='payment-dexcription-text-box'>{props.transfer.descrip.value}</div>
                        </div>
                    </div>
                    <div class='middle-inner-box'>
                        <div class='payment-details'>
                            <div class='payment-dexcription-text-box'>{props.error ? 'Error, please check transfer details' : ''}</div>
                        </div>
                    </div>
                    <div class='button-container'>
                        <button class='orange-button space-width' onClick={props.onSubmit}>
                            <span class='button-text'>Transfer</span>
                        </button>
                        <button class="white-button space-width" onClick={props.cancelPayment}>
                            <span class='white-button-text'>Cancel</span>
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

    const {authState, authService} = useOktaAuth();

    const showConfirm = () => setShow(true);
    const closeConfirm = () => {
        setTransfer('');
        setShow(false);
        setErr(false);
    };

    function handleSubmit(event) {
        event.preventDefault();
        const { destID, amount, description } = event.target.elements;
        
        setTransfer({
            destID: destID,
            amount: amount,
            descrip: description
        }); 
    
        showConfirm();
    }
       
    async function validatePayment(event) {
        event.preventDefault();
        if (authState.isAuthenticated) {
            const userInfo = await authService.getUser();

            console.log(userInfo)

            fetch('http://localhost:9000/transferFunds', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    src_email: userInfo.email,
                    dest_id: transfer.destID.value,
                    amount: transfer.amount.value,
                    descrip: transfer.descrip.value
                })
            })
            .then(function (responseFromServer) {
                if(responseFromServer.status === 200) {
                    console.log('responseFromServer');

                    //Page re-route
                    window.location.href = "/Dashboard?user_id=1";
                } else {
                    setErr(true)
                }
            });
        }
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