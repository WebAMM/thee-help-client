export const BASE_URL = "https://the-help.vercel.app/";
// export const BASE_URL = "http://localhost:4000/";

//User API's
export const USER_BASE_URL = BASE_URL + "user/";
export const SIGN_UP = USER_BASE_URL + "add_user";
export const SIGN_IN = USER_BASE_URL + "login_user";
export const UPDATE_PASSWORD = USER_BASE_URL + "reset_password/";
export const GET_USER_LIST = USER_BASE_URL + "get_users";
export const GET_USER_BY_ID = USER_BASE_URL;
export const UPDATE_USER_BY_ID = USER_BASE_URL;

//Client API's
export const CLIENT_BASE_URL = BASE_URL + "client/";
export const ADD_CLIENT = CLIENT_BASE_URL + "add_client_by_user";
export const GET_CLIENT_LIST = CLIENT_BASE_URL + "get_client_by_user";
export const GET_CLIENT_BY_ID = CLIENT_BASE_URL;
export const DELETE_CLIENT = CLIENT_BASE_URL;

//Service API's
export const SERVICE_BASE_URL = BASE_URL + "service/";
export const ADD_SERVICE = SERVICE_BASE_URL + "add_service_with_base64";
export const GET_SERVICE_LIST = SERVICE_BASE_URL + "get_services";
export const GET_SERVICE_BY_ID = SERVICE_BASE_URL;
export const GET_SERVICE_BY_USERID = SERVICE_BASE_URL + "get_services";
export const DELETE_SERVICE = SERVICE_BASE_URL;

//Invoice API's
export const INVOICE_BASE_URL = BASE_URL + "invoice/";
export const ADD_INVOICE = INVOICE_BASE_URL + "add_invoice";
export const GET_INVOICE_LIST = INVOICE_BASE_URL + "get_invoices_by_user";
export const GET_INVOICE_BY_ID = INVOICE_BASE_URL;
export const DELETE_INVOICE = INVOICE_BASE_URL;

//Appointment API's
export const APPOINTMENT_BASE_URL = BASE_URL + "appointment/";
export const ADD_APPOINTMENT = APPOINTMENT_BASE_URL + "add_appointment";
export const GET_APPOINTMENT_LIST =
  APPOINTMENT_BASE_URL + "get_appointments_by_user";
export const GET_ALL_APPOINTMENT_LIST =
  APPOINTMENT_BASE_URL + "get_all_appointments_by_user";
export const DELETE_APPOINTMENT_BY_ID = APPOINTMENT_BASE_URL;

//Payment API's
export const PAYMENT_BASE_URL = BASE_URL + "payment/";
export const ADD_PAYMENT = PAYMENT_BASE_URL + "add_payment";
export const GET_PAYMENT_BY_USERID =
  PAYMENT_BASE_URL + "get_payments_by_user_id";

// //Company Propfile API's
export const COMPANY_PROFILE_BASE_URL = BASE_URL + "companyProfile/";
export const ADD_COMPANY_PROFILE =
  COMPANY_PROFILE_BASE_URL + "add_company_profile";
export const GET_ALL_COMPANY_PROFILES =
  COMPANY_PROFILE_BASE_URL + "get_all_companies";
export const UPDATE_COMPANY_STATUS =
  COMPANY_PROFILE_BASE_URL + "update_company_status";
export const UPDATE_COMPANY_PROFILE_BY_ID = COMPANY_PROFILE_BASE_URL;
export const GET_COMPANY_PROFILE_BY_ID = COMPANY_PROFILE_BASE_URL;
export const DELETE_COMPANY_PROFILE_BY_ID = COMPANY_PROFILE_BASE_URL;
export const GET_COMPANY_PROFILE_BY_SLUG = COMPANY_PROFILE_BASE_URL;
