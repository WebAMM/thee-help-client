import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs, { Tab } from "react-best-tabs";
import "react-best-tabs/dist/index.css";
import Header from "../../components/Header/Header";
import "./home.scss";
import { addAppointmentsByUserId } from "../../store/reducers/appointment.reducer";
import { getCompanyProfileBySlug } from "../../store/reducers/companyProfile.reducer";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Stepper, Step } from "react-mui-stepper";
import PaymentForm from "../../components/paymentForm/PaymentForm";
import ClientRegisterForm from "../../components/clientRegisterForm/ClientRegisterForm";
import { ShowServices } from "../../components/showServices/ShowServices";
import MyPaymentForm from "../../components/paymentForm/squarePaymentForm";

const steps = ["Choose Appointment", "Your Information", "Confirmation"];

const Home = (props) => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userAdded, setUserAdded] = useState(false)
  const [client_id,setClient_id] = useState(null)
  const [currentService, setCurrentService] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [selectedServiceData, setSelectedServiceData] = useState({});
  const [company, setCompany] = useState([
    {
      _id: "",
      company_name: "",
      image: "",
      bio: "",
      slug: "",
      user_id: "",
      is_active: true,
    },
  ]);
  const [clientData, setClientData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });

  const getCompanyProfile = (e) => {
    // e.preventDefault();
    setIsLoading(true);
    dispatch(getCompanyProfileBySlug(slug))
      .then((response) => {
        if (response.payload.error) {
          console.log(response.payload.response)
          toast.error(response.payload.response);
          setIsLoading(false);
        } else {
          // toast.success("Company Profile added Successfully");
          setCompany(response.payload.CompanyProfile[0]);
          console.log(`response`, response.payload.CompanyProfile);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.message);
        console.log(`err`, err.message);
      });
  };

  useEffect(() => {
    getCompanyProfile();
    let  client = localStorage.getItem('client')
      console.log("client",client)
    if(client != null){
      setIsLoggedIn(true)
      let obj = JSON.parse(client)
      console.log(obj)
      setClient_id(obj.clientdata._id)
      setSelectedServiceData((pre)=>({...pre,client_id:obj.clientdata._id}))
      console.log("LoggedIn User")
    }
  }, [userAdded]);

  const selectedService = (service) => {
    setSelectedServiceData(service);
  };

  const selectedClient = (clientAppointment) => {
    setClientData(clientAppointment);
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    console.log(activeStep);
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : isLoggedIn?  activeStep+2: activeStep + 1;

   setSelectedServiceData((pre)=>({...pre,client_id:client_id||""}))    
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    console.log(activeStep);
    setSelectedServiceData((pre)=>({...pre,client_id:client_id||""}))    
    setActiveStep((prevActiveStep) => isLoggedIn? prevActiveStep-2 : prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <>
      <Header />
      <div className="home">
        <ToastContainer />
        <img src="/images/image27.png" className="under" alt="..." />
        <img src="/images/image28.png" className="over" alt="..." />
      </div>
      <div className="content">
        <div className="container">
          {/* <div className="row">
            <div className="col-md-6"> */}
          <div className="home__content">
            <img src="/images/logo-black.png" alt="..." />
          </div>
          <Stepper withNumbers activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <div style={{ color: "inherit" }} onClick={handleStep(index)}>
                  {label}
                </div>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <React.Fragment>
                <p sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </p>
                <div style={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <div style={{ flex: "1 1 auto" }} />
                  <button onClick={handleReset}>Reset</button>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {activeStep === 0 ? (
                  <>
                    <ShowServices
                      company={company}
                      next={handleNext}
                      back={handleBack}
                      complete={handleComplete}
                      selectedService={selectedService}
                      
                    />
                  </>
                ) : null}
                {activeStep === 1 ? (
                  <>
                    <ClientRegisterForm
                      next={handleNext}
                      back={handleBack}
                      complete={handleComplete}
                      selectedServiceData={selectedServiceData}
                      selectedService={selectedService}
                      setClientData={selectedClient}
                      setUserAdded={setUserAdded}
                    />
                  </>
                ) : null}
                {activeStep === 2 ? (
                  <>
                    <PaymentForm
                      next={handleNext}
                      back={handleBack}
                      complete={handleComplete}
                      selectedServiceData={selectedServiceData}
                      setClientData={clientData}
                      company={company}

                    />
                    {/* <MyPaymentForm
                      next={handleNext}
                      back={handleBack}
                      complete={handleComplete}
                    /> */}
                  </>
                ) : null}

                <p style={{ mt: 2, mb: 1, py: 1 }}>Step {activeStep + 1}</p>
                <div style={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    style={{ mr: 1 }}
                  >
                    Back
                  </button>
                  <div style={{ flex: "1 1 auto" }} />
                  <button onClick={handleNext} style={{ mr: 1 }}>
                    Next
                  </button>
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <p variant="caption" style={{ display: "inline-block" }}>
                        Step {activeStep + 1} already completed
                      </p>
                    ) : (
                      <button onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1
                          ? "Finish"
                          : "Complete Step"}
                      </button>
                    ))}
                </div>
              </React.Fragment>
            )}
          </div>

          {/* </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

Home.propTypes = {};

export default Home;
