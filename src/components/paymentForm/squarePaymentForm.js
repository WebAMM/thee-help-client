// Dependencies
import * as React from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

const SQUARE_APPLICATION_ID = "sandbox-sq0idb-WHjuyf7YDxlfl-ENhXKhNw",
  SQUARE_ACCESS_TOKEN =
    "EAAAENF1WGLlrRSvCTNrGz-hySjsIJyoXQeOrs8zf5EF88B6GGWS-TH-t-O-dg8l",
  SQUARE_LOCATION_ID = "L5WQ5PY7KJ28J",
  SQUARE_ENVIRONMENT = "sandbox";

const MyPaymentForm = (props) => {
  const {
    first_name,
    card_number,
    expiry_date,
    cvv,
    card_holder_name,
    card_type,
    amount,
    client_id,
  } = props;
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
      cardTokenizeResponseReceived={(token, buyer) => {
        console.info({ token, buyer });
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
      <CreditCard />
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
