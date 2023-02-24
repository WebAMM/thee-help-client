import axios from "axios";
import { ADD_PAYMENT, GET_PAYMENT_BY_USERID } from "../../utils/config";

const addPayment = async (paymentData) => {
  console.log("paymentDataByUserId", paymentData);
  //   const data = await axios.post(ADD_PAYMENT, {
  //     company_name,
  //     image,
  //     bio,
  //     slug,
  //     user_id,
  //   });
  //   console.log("addNewCopmanyProfile", data);
  //   return data;
};

const getPaymentByUserId = async (userId) => {
  const data = await axios.get(`${GET_PAYMENT_BY_USERID}/${userId}}`);
  console.log(data);
  return data;
};

const PaymentGateway = {
  addPayment,
  getPaymentByUserId,
};

export default PaymentGateway;
