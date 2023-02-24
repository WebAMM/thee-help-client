import React, { lazy, Suspense } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import PropTypes from "prop-types";

const Home = lazy(() => import("./pages/Home/Home"));

const App = (props) => {
  return (
    <Suspense fallback={<>loading...</>}>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/:slug" exact element={<Home />} />
      </Routes>
    </Suspense>
  );
};

App.propTypes = {};

export default App;
