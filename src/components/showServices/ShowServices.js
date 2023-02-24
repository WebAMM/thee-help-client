import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./showServices.scss";
import {
  GetAllServices,
  GetUserServices,
} from "../../store/reducers/services.reducer";
import moment from "moment";
import Pagination from "../pagination/Pagination";

export const ShowServices = (props) => {
  const { next, back, complete, selectedService, company } = props;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(5);
  const [appointmentDetails, setAppointmentDetails] = useState({
    appointment_date: "",
    appointment_time: "",
    client_id: "",
    message: "",
    service_id: "",
    title: "",
    user_id: "",
  });

  //   {
  //     "_id": "63f36472919298471962cf4e",
  //     "name": "service 3",
  //     "feature_image": "http://res.cloudinary.com/codembeded/image/upload/v1676895346/kywexsnavf0ufhgszyfu.png",
  //     "description": "short description",
  //     "amount": 100,
  //     "start_time": "09:00",
  //     "end_time": "19:00",
  //     "service_start_date": "2023-02-20T00:00:00.000Z",
  //     "service_end_date": "2023-02-28T00:00:00.000Z",
  //     "days_of_week": {
  //         "Sunday": false,
  //         "Monday": true,
  //         "Tuesday": true,
  //         "Wednesday": true,
  //         "Thursday": true,
  //         "Friday": true,
  //         "Saturday": false
  //     },
  //     "user_id": "63e661a923465a263ab31fab",
  //     "is_active": true,
  //     "__v": 0
  // }

  const bookAppointment = () => {
    next();
  };

  const handleBookAppointment = (service) => {
    console.log("service", service, "appointmentDetails", appointmentDetails);
    let data = {
      ...appointmentDetails,
      service_id: service._id,
      user_id: service.user_id,
      title: service.name,
      amount: service.amount,
    };
    setAppointmentDetails({
      ...appointmentDetails,
      service_id: service._id,
      user_id: service.user_id,
      title: service.name,
      amount: service.amount,
    });
    selectedService(data);
    bookAppointment(service);
  };

  const getServicesByUserId = () => {
    setIsLoading(true);
    const { _id, company_name, image, bio, slug, user_id, is_active } = company;
    dispatch(GetUserServices(user_id))
      .then((response) => {
        console.log("showServices", response.payload.services);
        setIsLoading(false);
        response.payload.error
          ? setErrorMessage(response.payload.error_msg) &&
            setIsLoading(true) &&
            setServices([])
          : setServices(response.payload.services) && setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getServicesByUserId();
  }, [dispatch, company]);

  // Get current posts
  const indexOfLastPost = currentPage * servicesPerPage;
  const indexOfFirstPost = indexOfLastPost - servicesPerPage;
  const currentServices = services.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log("currentServices", currentServices);

  return (
    <div>
      <div className="mt-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
        fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
        elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
        lectus. Class aptent taciti sociosqu ad litora torquent per conubia
        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim
        egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse
        ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi
        convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
        Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque
        quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo
        vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu
        vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus,
        porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non
        ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia.
        Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem
        condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi,
        ac posuere leo
      </div>
      <div className="category__content">
        <img
          src="/images/icons/Arrow - Left Circle.svg"
          alt="..."
          className="iconImage"
        />
        <span>View All Catagories</span>
      </div>
      <div className="category__content">
        <p>Choose Category</p>
        {currentServices?.map((service, index) => (
          <div key={index} className="category__content__item">
            <div className="category__content__item1">
              {/* <div className="category__content__title">{service.name}</div> */}
              {/* <button
                className="select__category__button"
                onClick={() => handleBookAppointment(service)}
              >
                Select
              </button> */}
            </div>
            <details>
              <div className="category__content__item1">
                <div className="category__content__title">{service.name}</div>
                <button
                  className="select__category__button"
                  onClick={() => handleBookAppointment(service)}
                >
                  Select & GoNext
                </button>
              </div>
              <summary>Service Name: {service?.name}</summary>
              <p>Description: {service?.description}</p>
              <label htmlFor="meeting-time">
                Choose a date for your appointment:
              </label>
              <input
                type="date"
                name="appointment_date"
                id="appointment_date"
                max={moment(service?.service_end_date).format("YYYY-MM-DD")}
                min={moment(service?.service_start_date).format("YYYY-MM-DD")}
                className="input"
                onChange={(e) => {
                  e.preventDefault();
                  setAppointmentDetails({
                    ...appointmentDetails,
                    appointment_date: e.target.value,
                  });
                }}
              />
              <br />
              <label htmlFor="hours">
                Mention your preferred working hours for appointment:
              </label>
              <input
                id="hours"
                type="time"
                name="time"
                min={service?.start_time}
                max={service?.end_time}
                value={appointmentDetails?.appointment_time}
                onChange={(e) => {
                  e.preventDefault();
                  setAppointmentDetails({
                    ...appointmentDetails,
                    appointment_time: e.target.value,
                  });
                }}
              />
              {/* <label htmlFor="time"> To </label>
              <input
                id="time"
                type="time"
                name="time"
                min={service?.start_time}
                max={service?.end_time}
                value={service?.start_time}
              /> */}
              <br />
              <small>
                Office hours are {service?.start_time} to {service?.end_time}
              </small>
              <br />
            </details>
          </div>
        ))}
      </div>
      {/* <Pagination
        servicesPerPage={servicesPerPage}
        totalServices={services.length}
        paginate={paginate}
      /> */}
      <Pagination
        totalItems={services.length}
        itemsPerPage={servicesPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
