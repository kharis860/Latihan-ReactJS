import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  decrement,
  deleteDivision,
  fetchDivision,
  increment,
  postDivision,
  putDivision,
  setIsLoadingEditFalse,
  setIsLoadingFalse,
} from "../redux/actions/divisionActions";
import "./Division.css";
export default function Division() {
  const count = useSelector((state) => state.count);
  const division = useSelector((state) => state.division);
  const isLoading = useSelector((state) => state.isLoading);
  const isLoadingEdit = useSelector((state) => state.isLoadingEdit);
  const dispatch = useDispatch();
  console.log(division);
  console.log(isLoading, "ini loading setelah post");

  useEffect(() => {
    dispatch(fetchDivision());
  }, []);

  let [visible, setVisible] = useState(false);
  let [visibleEdit, setVisibleEdit] = useState(false);
  let [divisionData, setDivisionData] = useState("");

  useEffect(() => {
    console.log("visible : ", visible);
  }, [visible]);
  useEffect(() => {
    if (isLoading) {
      resetForm();
    }
  }, [isLoading]);
  useEffect(() => {
    if (isLoadingEdit) {
      resetFormEdit();
    }
  }, [isLoadingEdit]);
  function addDivision(e) {
    e.preventDefault();
    console.log(divisionData);
    dispatch(postDivision(divisionData));
  }
  function editDivision(e) {
    e.preventDefault();
    console.log(divisionData);
    dispatch(putDivision(divisionData));
  }
  function handleEditDivision(rowData) {
    console.log("ini row data=>", rowData);
    setDivisionData(rowData);
    setVisibleEdit(true);
    console.log("ini division data dari edit", divisionData);
  }
  function handleDeleteDivision(rowData) {
    console.log("ini row data delete=>", rowData);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      console.log(res);
      dispatch(deleteDivision(rowData));
    });
  }
  function resetForm() {
    if (visible) {
      setVisible(false);
    }
    setDivisionData("");
    console.log(visible);
    dispatch(setIsLoadingFalse());
  }
  function resetFormEdit() {
    if (visibleEdit) {
      setVisibleEdit(false);
    }
    setDivisionData("");
    console.log(visibleEdit);
    dispatch(setIsLoadingEditFalse());
  }

  console.log("ini data fetch division", division);
  console.log("ini loading edit", isLoadingEdit);

  return (
    <div>
      <h1>tes</h1>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>plus</button>
      <button onClick={() => dispatch(decrement())}>minus</button>
      <br />
      <div className="card flex justify-content-center">
        <Button
          label="Add Division"
          icon="pi pi-plus"
          onClick={() => {
            setDivisionData("");
            setVisible(true);
          }}
        />
        <Dialog
          header="Form Add Division"
          visible={visible}
          style={{ width: "25vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <div className="card flex justify-content-center mt-4">
            <form onSubmit={addDivision}>
              <FloatLabel>
                <InputText
                  id="Division"
                  value={divisionData}
                  onChange={(e) => setDivisionData(e.target.value)}
                />
                <label htmlFor="Division">Division Name</label>
              </FloatLabel>
              <Button label="Submit" type="submit" className="flex mt-4" />
            </form>
          </div>
        </Dialog>
      </div>
      <Dialog
        header="Form Edit Division"
        visible={visibleEdit}
        style={{ width: "25vw" }}
        onHide={() => {
          if (!visibleEdit) return;
          setVisibleEdit(false);
        }}
      >
        <div className="card flex justify-content-center mt-4">
          <form onSubmit={editDivision}>
            <FloatLabel>
              <InputText
                id="Division"
                value={divisionData.division_name}
                onChange={(e) => {
                  setDivisionData({
                    ...divisionData,
                    division_name: e.target.value,
                  });
                  console.log("ini division data dari on change", divisionData);
                }}
              />
              <label htmlFor="Division">Division Name</label>
            </FloatLabel>
            <Button label="Submit" type="submit" className="flex mt-4" />
          </form>
        </div>
      </Dialog>
      <div className="card">
        <DataTable value={division} tableStyle={{ minWidth: "50rem" }}>
          <Column field="id" header="ID"></Column>
          <Column field="division_name" header="Division Name"></Column>
          <Column
            header="Action"
            body={(rowData) => (
              <div className="flex gap-2">
                <Button
                  icon="pi pi-pencil"
                  label="Edit"
                  className="p-button-rounded p-button-warning"
                  onClick={() => handleEditDivision(rowData)}
                />
                <Button
                  icon="pi pi-trash"
                  label="Delete"
                  className="p-button-rounded p-button-danger"
                  onClick={() => handleDeleteDivision(rowData)}
                />
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
