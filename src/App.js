import React, { useEffect, useState } from "react";
import ListTypes from "./ListTypes";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./css/App.css";
import Login from "./Login";

function App({ apiUrl }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ types: [] });

  useEffect(() => {
    async function fetchData() {
      const repsonse = await fetch("http://localhost:98/api/types");
      const result = await repsonse.json();
      setData({ types: result });
      setLoading(false);
    }
    fetchData();
  }, []);
  console.log(data.types[0]);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/types"
            element={loading ? "Loading..." : <ListTypes data={data} />}
          />
        </Routes>
      </div>
    </>
  );
}

const mapStateToProps = (store) => {
  const { apiUrl } = store;
  return { apiUrl: apiUrl };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // const { flight_number } = ownProps;
  return {
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
