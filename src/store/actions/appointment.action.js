import axios from "axios";
import {
  GET_ALL_APPOINTMENT_LIST,
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT_BY_ID,
} from "../../utils/config";

const getAppointmentsByUserId = async (userId) => {
  const data = await axios.get(`${GET_ALL_APPOINTMENT_LIST}/${userId}`);
  return data;
};

const addAppointmentsByUserId = async ({
  appointment_date,
  appointment_time,
  client_id,
  message,
  service_id,
  title,
  user_id,
}) => {
  const body = {
    appointment_date,
    appointment_time,
    client_id,
    message,
    service_id,
    title,
    user_id,
  };
  const data = await axios.post(ADD_APPOINTMENT, body);
  console.log(data);
  return data;
};

const deleteAppointmentsById = async (appointmentId) => {
  const data = await axios.delete(
    `${DELETE_APPOINTMENT_BY_ID}${appointmentId}`
  );
  console.log("deleteAppointmentsById", data);
  return data;
};

const AppointmentService = {
  getAppointmentsByUserId,
  addAppointmentsByUserId,
  deleteAppointmentsById,
};

export default AppointmentService;
