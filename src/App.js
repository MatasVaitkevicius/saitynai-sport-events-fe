import React, { useEffect, useState } from "react";
import ListTypes from "./ListTypes";
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import "./css/App.css";
import Login from "./Login";
import ListEvents from "./ListEvents";
import ListComments from "./ListComments";

function App({ apiUrl, access_token, loggedIn, dispatch }) {
  return (
    <>
      <div className="App">
        <Routes>
          <Route
            path="*"
            element={
              <main style={{ padding: "10rem", fontSize: "100px" }}>
                <p>Error 404 page not found.</p>
              </main>
            }
          ></Route>
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/types" /> : <Navigate to="/login" />}
          ></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/types" element={<ListTypes />} />
          <Route path="/types/:typeId/events" element={<ListEvents />} />
          <Route path="/types/:typeId/events/:eventId/comments" element={<ListComments />} />
        </Routes>
      </div>
    </>
  );
}

const mapStateToProps = (store) => {
  const { apiUrl, access_token, loggedIn } = store;
  return { apiUrl, access_token, loggedIn };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // const { flight_number } = ownProps;
  return {
    dispatch,
    // favouriteAdd: () =>
    //   dispatch({
    //     type: FAVOURITE_ADD,
    //     payload: { id: flight_number, favourited: true },
    //   }),
    // favouriteRemove: () =>
    //   dispatch({
    //     type: FAVOURITE_REMOVE,
    //     payload: { id: flight_number, favourited: false },
    //   }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
