import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./paymentForm.scss";
import {
  getPaymentByUserId,
  addPayment,
} from "../../store/reducers/payment.reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyPaymentForm from "./squarePaymentForm";

function PaymentForm(props) {
  const { next, back, complete } = props;
  const dispatch = useDispatch();
  const [paymentDetails, setPaymentDetails] = useState({
    first_name: "",
    last_name: "",
    card_number: "",
    expiry_date: "",
    cvv: "",
    card_holder_name: "",
    card_type: "",
    amount: "",
    client_id: "",
  });

  // "payment_id": "123456789",
  // "payment_gateway": "Paypal",
  // "client_id": "63a432dbcbaa04d091344c81",
  // "invoice_id": "63a43567967f7e165e875a6f",
  // "amount": "100",
  // "status": true

  const submitPaymeny = async () => {
    try {
      dispatch(addPayment(paymentDetails))
        .then((response) => {
          if (response.payload.error) {
            toast.error(response.payload.response);
          } else {
            toast.success("Client added Successfully");
            console.log(`response`, response.payload.client);
          }
        })
        .catch((err) => {
          console.log(`err`, err.message);
        });
      // const response = await client.paymentsApi.createPayment({
      //   sourceId: "ccof:GaJGNaZa8x4OgDJn4GB",
      //   idempotencyKey: "7b0f3ec5-086a-4871-8f13-3c81b3875218",
      //   amountMoney: {
      //     amount: 1000,
      //     currency: "USD",
      //   },
      //   appFeeMoney: {
      //     amount: 10,
      //     currency: "USD",
      //   },
      //   autocomplete: true,
      //   customerId: "W92WH6P11H4Z77CTET0RNTGFW8",
      //   locationId: "L88917AVBK2S5",
      //   referenceId: "123456",
      //   note: "Brief description",
      // });
      // console.log(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    console.log("paymentDetails", paymentDetails);
    complete();
    // submitPaymeny();
  };

  return (
    <div className="category__content">
      <div className="container">
        <h3>Secure Payment</h3>
        <p>You will be billed $0.50 for your appointment.</p>
        <br />
        <ToastContainer />
        <div className="row">
          <div className="col-md-6 client__input__box">
            <label htmlFor="fname" className="client__input__box__title">
              First name*:
            </label>
            <br />
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="First Name"
              className="client__input__box__input"
              value={paymentDetails?.first_name}
              onChange={(e) => {
                setPaymentDetails({
                  ...paymentDetails,
                  first_name: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-md-6 client__input__box">
            <label htmlFor="lname" className="client__input__box__title">
              Last name*:
            </label>
            <br />
            <input
              type="text"
              id="lname"
              name="lname"
              placeholder="Last Name"
              className="client__input__box__input"
              value={paymentDetails?.last_name}
              onChange={(e) => {
                setPaymentDetails({
                  ...paymentDetails,
                  last_name: e.target.value,
                });
              }}
            />
          </div>

          <div className="col-md-12 client__input__box">
            <label htmlFor="amount" className="client__input__box__title">
              Total amount*:
            </label>
            <br />
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="1000$"
              className="client__input__box__input"
              value={paymentDetails?.cvv}
              onChange={(e) => {
                setPaymentDetails({
                  ...paymentDetails,
                  cvv: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-md-12 client__input__box">
            <MyPaymentForm paymentDetails={paymentDetails} />
          </div>
          {/* <div className="col-md-6 client__input__box">
            <label htmlFor="cardNumber" className="client__input__box__title">
              Card Number*:
            </label>
            <br />
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="4374520016476043"
              className="client__input__box__input"
              value={paymentDetails?.card_number}
              onChange={(e) => {
                setPaymentDetails({
                  ...paymentDetails,
                  card_number: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-md-6 client__input__box">
            <label htmlFor="nameOnCard" className="client__input__box__title">
              Name on Card*:
            </label>
            <br />
            <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              placeholder="Exact Name On Card"
              className="client__input__box__input"
              value={paymentDetails?.card_holder_name}
              onChange={(e) => {
                setPaymentDetails({
                  ...paymentDetails,
                  card_holder_name: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-md-6 client__input__box">
            <label htmlFor="cardType" className="client__input__box__title">
              Card Type*:
            </label>
            <br />
            <input
              type="text"
              id="cardType"
              name="cardType"
              placeholder="VISA or MasterCard"
              className="client__input__box__input"
              value={paymentDetails?.card_type}
              onChange={(e) => {
                setPaymentDetails({
                  ...paymentDetails,
                  card_type: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-md-3 client__input__box">
            <label htmlFor="expiryDate" className="client__input__box__title">
              Expiry Date*:
            </label>
            <br />
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              className="client__input__box__input"
              value={paymentDetails?.expiry_date}
              onChange={(e) => {
                setPaymentDetails({
                  ...paymentDetails,
                  expiry_date: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-md-3 client__input__box">
            <label htmlFor="cvv" className="client__input__box__title">
              CVV Code*:
            </label>
            <br />
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="704"
              className="client__input__box__input"
              value={paymentDetails?.cvv}
              onChange={(e) => {
                setPaymentDetails({
                  ...paymentDetails,
                  cvv: e.target.value,
                });
              }}
            />
          </div> */}
        </div>
        <div className="Payment__submit">
          <button className="client__cancel__button" onClick={back}>
            Cancel
          </button>
          <button
            className="client__submit__button"
            onClick={handleSubmitPayment}
          >
            confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;

// {
//   "first_name": "Hamzah",
//   "last_name": "Hashmi",
//   "card_number": "1234567891234567",
//   "expiry_date": "07/24",
//   "cvv": "707",
//   "card_holder_name": "hamza hashmi",
//   "card_type": "visa"
// }
