// Dependencies
import * as React from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  getPaymentByUserId,
  addPayment,
} from "../../store/reducers/payment.reducer";
import {addAppointmentsByUserId} from '../../store/reducers/appointment.reducer'

const SQUARE_APPLICATION_ID = "sandbox-sq0idb-Sd-7i_zsT6sigruHEluwfQ",
  SQUARE_ACCESS_TOKEN =
    "EAAAEBV9BqakRfPsjwJvOaGDUUiXBTM93SsCp7RDiJzRfLeantYTz7o-5131eJbw",
  SQUARE_LOCATION_ID = "LBAQ5YH1FKB6K",
  SQUARE_ENVIRONMENT = "sandbox";

const MyPaymentForm = (props) => {
  const {
    first_name,
    last_name,
    card_number,
    expiry_date,
    cvv,
    card_holder_name,
    card_type,
    amount,
    client_id,
  } = props.paymentDetails;
  let selectedServiceData = props.selectedServiceData
  let setClientData = props.setClientData

  const company = props.company
  const complete = props.complete;
  const dispatch = useDispatch();

  return (
    <PaymentForm
      style={{
        backgroundColor:
          "linear-gradient(180deg, #BA9743 0%, #FFD66B 100%) !important",
      }}
      /**
       * Identifies the calling form with a verified application ID generated from
       * the Square Application Dashboard.
       */
      applicationId={SQUARE_APPLICATION_ID}
      /**
       * Invoked when payment form receives the result of a tokenize generation
       * request. The result will be a valid credit card or wallet token, or an error.
       */
      // cardTokenizeResponseReceived={(token, buyer) => {
      //   console.info({ token, buyer });
      // }}
      cardTokenizeResponseReceived={(token, verifiedBuyer) => {
        console.log('token:', token);
        console.log('verifiedBuyer:', verifiedBuyer);

        const body = {
          first_name:first_name,
          last_name:last_name,
          amount:amount,
          sourceId:token.token,
          userId:company.user_id,
          client_id:setClientData._id,
        }
        console.log(body)
      //  return
        try {
          dispatch(addPayment(body))
            .then((response) => {
              if (response.payload.error) {
                toast.error(response.payload.response);
              } else {
                // toast.success("Payment Successfully");

                let data = {
                  appointment_date:selectedServiceData?.appointment_date,
                  appointment_time:selectedServiceData?.appointment_time,
                  title:selectedServiceData?.title,
                  client_id:selectedServiceData?.client_id,
                  user_id:selectedServiceData?.user_id,
                  service_id:selectedServiceData?.service_id,
                  message:setClientData?.message,
                  
                }
    
                dispatch(addAppointmentsByUserId(data))
                .then((response) => {
                  if (response.payload.error) {
                    toast.error(response.payload.response);
                  } else {
                    toast.success("Appointment added Successfully");
                    complete()
                    console.log(`response`, response.payload.client);
                  }
                })



                console.log(`response`, response);
              }
            })
            .catch((err) => {
              console.log(`err`, err.message);
            });
        } catch (error) {

        }


      }}
      /**
       * This function enable the Strong Customer Authentication (SCA) flow
       *
       * We strongly recommend use this function to verify the buyer and reduce
       * the chance of fraudulent transactions.
       */
      createVerificationDetails={() => ({
        amount: "1.00",
        /* collected from the buyer */
        billingContact: {
          addressLines: ["123 Main Street", "Apartment 1"],
          familyName: "Doe",
          givenName: "John",
          countryCode: "GB",
          city: "London",
        },
        currencyCode: "GBP",
        intent: "CHARGE",
      })}
      /**
       * Identifies the location of the merchant that is taking the payment.
       * Obtained from the Square Application Dashboard - Locations tab.
       */
      locationId={SQUARE_LOCATION_ID}
    >
      <CreditCard    
       buttonProps={{
        css: {
          backgroundColor: "#BA9743",
          fontSize: "14px",
          color: "#fff",
          "&:hover": {
            backgroundColor: "black",
          },
        },
      }}/>
    </PaymentForm>
  );
};

export default MyPaymentForm;

// import React, { useState } from "react";

// import {
//   SquarePaymentForm,
//   ApplePayButton,
//   CreditCardCVVInput,
//   CreditCardExpirationDateInput,
//   CreditCardNumberInput,
//   CreditCardPostalCodeInput,
//   CreditCardSubmitButton,
//   GooglePayButton,
//   MasterpassButton,
// } from "react-square-payment-form";
// import "react-square-payment-form/lib/default.css";

// const APPLICATION_ID = "1234";
// const LOCATION_ID = "1234";

// const PaymentPage = () => {
//   const [errorMessages, setErrorMessages] = useState([]);

//   function cardNonceResponseReceived(
//     errors,
//     nonce,
//     cardData,
//     buyerVerificationToken
//   ) {
//     if (errors) {
//       setErrorMessages(errors.map((error) => error.message));
//       return;
//     }

//     setErrorMessages([]);

//     alert(
//       "nonce created: " +
//         nonce +
//         ", buyerVerificationToken: " +
//         buyerVerificationToken
//     );
//     // API.post('/payments', data: { nonce: nonce, buyerVerificationToken: buyerVerificationToken }) // implement this
//   }

//   function createPaymentRequest() {
//     return {
//       requestShippingAddress: false,
//       requestBillingInfo: true,
//       currencyCode: "USD",
//       countryCode: "US",
//       total: {
//         label: "MERCHANT NAME",
//         amount: "0",
//         pending: false,
//       },
//       lineItems: [
//         {
//           label: "Subtotal",
//           amount: "0",
//           pending: false,
//         },
//       ],
//     };
//   }

//   function createVerificationDetails() {
//     return {
//       amount: "100.00",
//       currencyCode: "USD",
//       intent: "CHARGE",
//       billingContact: {
//         familyName: "Smith",
//         givenName: "John",
//         email: "jsmith@example.com",
//         country: "GB",
//         city: "London",
//         addressLines: ["1235 Emperor's Gate"],
//         postalCode: "SW7 4JA",
//         phone: "020 7946 0532",
//       },
//     };
//   }

//   function postalCode() {
//     const postalCode = "12345"; // your logic here
//     return postalCode;
//   }

//   function focusField() {
//     return "cardNumber";
//   }

//   const loadingView = <div className="sq-wallet-loading"></div>;
//   const unavailableApple = (
//     <div className="sq-wallet-unavailable">
//       Apple pay unavailable. Open safari on desktop or mobile to use.
//     </div>
//   );
//   const unavailableGoogle = (
//     <div className="sq-wallet-unavailable">Google pay unavailable.</div>
//   );
//   const unavailableMasterpass = (
//     <div className="sq-wallet-unavailable">Masterpass unavailable.</div>
//   );

//   return (
//     <SquarePaymentForm
//       sandbox={true}
//       applicationId={APPLICATION_ID}
//       locationId={LOCATION_ID}
//       cardNonceResponseReceived={cardNonceResponseReceived}
//       createPaymentRequest={createPaymentRequest}
//       createVerificationDetails={createVerificationDetails}
//       postalCode={postalCode}
//       focusField={focusField}
//     >
//       <ApplePayButton
//         loadingView={loadingView}
//         unavailableView={unavailableApple}
//       />
//       <GooglePayButton
//         loadingView={loadingView}
//         unavailableView={unavailableGoogle}
//       />
//       <MasterpassButton
//         loadingView={loadingView}
//         unavailableView={unavailableMasterpass}
//       />

//       <div className="sq-divider">
//         <span className="sq-divider-label">Or</span>
//         <hr className="sq-divider-hr" />
//       </div>

//       <fieldset className="sq-fieldset">
//         <CreditCardNumberInput />

//         <div className="sq-form-third">
//           <CreditCardExpirationDateInput />
//         </div>

//         <div className="sq-form-third">
//           <CreditCardPostalCodeInput />
//         </div>

//         <div className="sq-form-third">
//           <CreditCardCVVInput />
//         </div>
//       </fieldset>

//       <CreditCardSubmitButton>Pay $1.00</CreditCardSubmitButton>

//       <div className="sq-error-message">
//         {errorMessages.map((errorMessage) => (
//           <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
//         ))}
//       </div>
//     </SquarePaymentForm>
//   );
// };

// export default PaymentPage;
