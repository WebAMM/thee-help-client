import axios from "axios";

import {
  GET_CLIENT_LIST,
  ADD_CLIENT,
  GET_CLIENT_BY_ID,
  DELETE_CLIENT,
} from "../../utils/config";

const getAllClientsbyUserId = async (userId) => {
  const data = await axios.get(`${GET_CLIENT_LIST}/${userId}`);
  return data;
};

const addClientByUserId = async (client) => {
  const { first_name, last_name, phone, email, user_id } = client;
  console.log(`client`, client);
  console.log("ADD_CLIENT", ADD_CLIENT);
  const data = await axios.post(ADD_CLIENT, {
    first_name,
    last_name,
    phone,
    email,
    user_id: user_id,
  });

  
    if (data.data) {
      localStorage.setItem("client", JSON.stringify(data.data));
    }

  console.log(`data`, data);
  return data;
};

const getClientById = async (clientId) => {
  const data = await axios.get(`${GET_CLIENT_BY_ID}${clientId}`);
  return data;
};

const deleteClientById = async (clientId) => {
  const data = await axios.delete(`${DELETE_CLIENT}${clientId}`);
  return data;
};

const ClientService = {
  getAllClientsbyUserId,
  addClientByUserId,
  getClientById,
  deleteClientById,
};

export default ClientService;
