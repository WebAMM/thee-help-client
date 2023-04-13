import axios from "axios";
import { ADD_PAYMENT, GET_PAYMENT_BY_USERID } from "../../utils/config";

const addPayment = async (body) => {
  console.log("paymentDataByUserId", body);
  try {
    const data = await axios.post(ADD_PAYMENT, body);
    console.log("addNewCopmanyProfile", data);
    return data;
  } catch (error) {
    console.log(error)
  }

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
