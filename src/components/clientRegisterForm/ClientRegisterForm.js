import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addClientByUserId } from "../../store/reducers/clients.reducer";
import { addAppointmentsByUserId } from "../../store/reducers/appointment.reducer";
import TimeCalculator from "../timeCalculator/TimeCalculator";
import "./clientRegisterForm.scss";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientRegisterForm = (props) => {
  const dispatch = useDispatch();
  const { next, back, complete, selectedServiceData,setClientData } = props;
  const {
    appointment_date,
    appointment_time,
    client_id,
    message,
    service_id,
    title,
    user_id,
    amount,
  } = selectedServiceData;
  const selectedService = props.selectedService;
  const setUserAdded = props.setUserAdded;
  const [clientId, setClientId] = useState("");
  const [clientDetails, setClientDetails] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    user_id: user_id,
  });
  const [appointmentData, setAppointmentData] = useState({
    appointment_date: appointment_date,
    appointment_time: appointment_time,
    client_id: client_id,
    message: message,
    service_id: service_id,
    title: title,
    user_id: user_id,
  });

  const bookAppointment = () => {
    dispatch(addAppointmentsByUserId(appointmentData))
      .then((response) => {
        console.log(response);
        if (response.payload.error) {
          toast.error(response.payload.response);
        } else {
          // toast.success("Appointment booked Successfully");
          next();
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const addClient = () => {
    dispatch(addClientByUserId(clientDetails))
      .then(async(response) => {
        if (response.payload.error) {
          toast.error(response.payload.response);
        } else {
          // var clientd = response.payload.client._id;
          setAppointmentData({
            ...appointmentData,
            client_id: response.payload.clientdata._id,
          });

          selectedService((pre)=>({...pre,client_id: response.payload.clientdata._id}))
          setClientData({...response.payload.clientdata,message:appointmentData.message})
          setUserAdded(true)
          next();
          console.log(`response`, response.payload.clientdata);
          toast.success("Client added Successfully");
        }
      })
      .catch((err) => {
        console.log(`err`, err.message);
      });
  };

  const handleAddClient = (e) => {
    console.log("clientDetails", clientDetails);
    e.preventDefault();
    addClient();
    // setClientData(clientDetails)
    // selectedServiceData(appointmentData)

  };

  useEffect(() => {
    // let client = await localStorage.getItem("client");
      

    if (appointmentData.client_id?.length > 0) {
      bookAppointment();
    }
  }, [appointmentData.client_id]);

  return (
    <div>
      {" "}
      <div className="category__content">
        <img
          src="/images/icons/Arrow - Left Circle.svg"
          alt="..."
          className="iconImage"
        />
        <ToastContainer />
        <span>Edit Appointment Information </span>
      </div>
      <div className="category__content">
        <div className="category__content__item">
          <div className="category__content__item1">
            <div className="category__content__title">
              <h6>{selectedServiceData?.title}</h6>
              <p>{selectedServiceData?.description}</p>
              {/* <TimeCalculator
                startTime={selectedServiceData?.start_time}
                endTime={selectedServiceData?.end_time}
              /> */}
              <p>
                <strong>Starting from :</strong>{" "}
                {moment(
                  selectedServiceData?.appointment_time,
                  "hh:mm a"
                ).format("hh:mm a")}{" "}
                on{" "}
                {moment(
                  selectedServiceData?.appointment_date,
                  "YYYY-MM-DD"
                ).format("ll")}
              </p>
            </div>
          </div>
        </div>

        {/* <div className="container"> */}
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
              onChange={(e) => {
                setClientDetails({
                  ...clientDetails,
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
              onChange={(e) => {
                setClientDetails({
                  ...clientDetails,
                  last_name: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-md-6 client__input__box">
            <label htmlFor="phone" className="client__input__box__title">
              Phone Number*:
            </label>
            <br />
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              className="client__input__box__input"
              onChange={(e) => {
                setClientDetails({
                  ...clientDetails,
                  phone: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-md-6 client__input__box">
            <label htmlFor="email" className="client__input__box__title">
              Email Address*:
            </label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email Address"
              className="client__input__box__input"
              onChange={(e) => {
                setClientDetails({
                  ...clientDetails,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-md-6 client__input__box">
            <label
              htmlFor="appointmentTitle"
              className="client__input__box__title"
            >
              Appointment Title*:
            </label>
            <br />
            <input
              type="text"
              id="appointmentTitle"
              name="appointmentTitle"
              placeholder="Short title for your appointment"
              className="client__input__box__input"
              value={appointmentData?.title}
              onChange={(e) => {
                setAppointmentData({
                  ...appointmentData,
                  title: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-md-6 client__input__box">
            <label
              htmlFor="appointmentMsg"
              className="client__input__box__title"
            >
              Message*:
            </label>
            <br />
            <input
              type="text"
              id="appointmentMsg"
              name="appointmentMsg"
              placeholder="Short message for your appointment"
              className="client__input__box__input"
              onChange={(e) => {
                setAppointmentData({
                  ...appointmentData,
                  message: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="row">
          <button className="client__submit__button" onClick={back}>
            Back
          </button>
          <button className="client__submit__button" onClick={handleAddClient}>
            Submit
          </button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ClientRegisterForm;
