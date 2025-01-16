import axios from "axios";
import Swal from "sweetalert2";
// Action Types
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const PUT_DIVISION = "PUT_DIVISION";
export const FETCH_DIVISION = "FETCH_DIVISION";
export const POST_DIVISION = "POST_DIVISION";
export const DELETE_DIVISION = "DELETE_DIVISION";
export const SET_ISLOADING_FALSE = "SET_ISLOADING_FALSE";
export const SET_ISLOADING_EDIT_FALSE = "SET_ISLOADING_EDIT_FALSE";

const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJmdWxsX25hbWUiOiJ3aWpheWEgc2FwdXRyYSIsInVzZXJuYW1lIjoiSFIwMSIsInN1YiI6IjY2NjYzNTY1LTY1NjEtMzkzMy0yZDYyLTM4MzMzOTJkMzEzMSIsImlhdCI6MTczNjk5MjgzMywiZXhwIjoxNzM3MDc5MjMzfQ.ZLzU_PX4IYquNR47KLOhKEDf2a4IKoLEGpnqjZQHMYYIvGOdxeTFZQ3Ie-0ga_THoERhiFOVc9-flVkpUqknlw";
// Action Creators
export const setIsLoadingEditFalse = () => {
  return {
    type: SET_ISLOADING_EDIT_FALSE,
  };
};
export const setIsLoadingFalse = () => {
  return {
    type: SET_ISLOADING_FALSE,
  };
};
export const increment = () => {
  return {
    type: INCREMENT,
  };
};

export const decrement = () => {
  return {
    type: DECREMENT,
  };
};

export const fetchDivision = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8080/divisions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: FETCH_DIVISION, payload: res.data.content });
  } catch (error) {
    console.error(error);
  }
};

export const postDivision = (divisionData) => async (dispatch) => {
  try {
    console.log(divisionData);

    const postDivision = await axios
      .post(
        "http://localhost:8080/divisions",
        { division_name: divisionData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((postDivision) => {
        dispatch({
          type: POST_DIVISION,
          isLoading: true,
          payload: postDivision.data,
        });
        console.log(postDivision.data);
        Swal.fire({
          icon: "success",
          title: "Succes Add Division Data",
        }).then((res) => {
          if (res.isConfirmed) {
            dispatch(fetchDivision());
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err);
  }
};
export const putDivision = (divisionData) => async (dispatch) => {
  try {
    console.log("ini division data dari action put", divisionData);

    const putDivision = await axios
      .put(
        `http://localhost:8080/divisions/${divisionData.id}`,
        { division_name: divisionData.division_name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: PUT_DIVISION,
          isLoadingEdit: true,
          payload: res.data,
        });
        Swal.fire({
          icon: "success",
          title: "Succes Edit Division Data",
          customClass: {
            container: "my-swal",
          },
        }).then((res) => {
          if (res.isConfirmed) {
            dispatch(fetchDivision());
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err);
  }
};
export const deleteDivision = (divisionData) => async (dispatch) => {
  try {
    const deleteDivision = await axios
      .delete(`http://localhost:8080/divisions/${divisionData.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Succes Delete Division Data",
          customClass: {
            container: "my-swal",
          },
        }).then((res) => {
          console.log(res);
          dispatch(fetchDivision());
        });
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err);
  }
};
