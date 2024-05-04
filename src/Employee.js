import React, { useEffect, useState } from "react";
import POSTEmployee from "./API/Employee/POSTEmployee";
import GETEmployee from "./API/Employee/GETEmployee";
import UPDATEEmployee from "./API/Employee/UPDATEEmployee";
import DELETEEmployee from "./API/Employee/DELETEEmployee";

export default function Employee() {
  let [employeeList, setEmployeeList] = useState([]);
  let [updatebool, setUpdateBool] = useState(0);
  let [rowId, setRowId] = useState("");
  let [sendForm, setSendForm] = useState({
    employeeCode: "",
    employeeName: "",
    dateOfBirth: "",
    gender: "",
    department: "",
    designation: "",
    basicSalary: "",
  });

  let handleChange = (e) => {
    const { name, value } = e.target;
    setSendForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let getALLEmployee = async () => {
    const empresponse = await GETEmployee();
    setEmployeeList(empresponse.response);
  };
  let handleClear = () => {
    document.getElementById("gender").selectedIndex = 0;
    setUpdateBool(0);
    setSendForm((prev) => ({
      ...prev,
      employeeCode: "",
      employeeName: "",
      dateOfBirth: "",
      department: "",
      designation: "",
      basicSalary: "",
      gender: "",
    }));
  };

  let handleEdit = (
    id,
    employeeCode,
    employeeName,
    dateOfBirth,
    gender,
    department,
    designation,
    basicSalary
  ) => {
    setUpdateBool(1);
    const gg = gender ? "1" : "2";
    setSendForm((sendForm) => ({
      ...sendForm,
      id: id,
      employeeCode: employeeCode,
      employeeName: employeeName,
      dateOfBirth: dateOfBirth,
      gender: gg,
      department: department,
      designation: designation,
      basicSalary: basicSalary,
    }));
    document.getElementById("gender").value = gg;
    document.getElementById("dateOfBirth").value = dateOfBirth;
  };

  let handleUpdate = async () => {
    const obj = {
      id: sendForm.id,
      employeeCode: sendForm.employeeCode,
      employeeName: sendForm.employeeName,
      dateOfBirth: sendForm.dateOfBirth,
      gender: sendForm.gender === "1" ? true : false,
      department: sendForm.department,
      designation: sendForm.designation,
      basicSalary: sendForm.basicSalary,
    };
    const response = await UPDATEEmployee(obj);
    if (response.status === 1) {
      alert("Updated successfully");
      handleClear();
      getALLEmployee();
    } else {
      alert(response.responseValue);
    }
  };
  let handleSave = async () => {
    //save data to database here
    const obj = {
      employeeCode: sendForm.employeeCode,
      employeeName: sendForm.employeeName,
      dateOfBirth: sendForm.dateOfBirth,
      gender: sendForm.gender === "1" ? true : false,
      department: sendForm.department,
      designation: sendForm.designation,
      basicSalary: sendForm.basicSalary,
    };
    console.log("Saved obj", obj);
    // return;
    const response = await POSTEmployee(obj);
    if (response.status === 1) {
      handleClear();
      getALLEmployee();
    } else {
      alert(response.responseValue);
    }
  };

  let handleDelete = async () => {
    const objDel = {
      id: rowId,
    };
    const response = await DELETEEmployee(objDel);
    if (response.status === 1) {
      getALLEmployee();
      alert("Deleted Successfully");
    }
  };
  useEffect(() => {
    getALLEmployee();
  }, []);

  return (
    <>
      {/* Employee */}
      <div className="container-xxl mt-5 border border-info">
        <div className="col-12 mb-3">
          <div className="row">
            <div className="col-3 mt-2">
              <label for="exampleFormControlInput1" className="form-label">
                Employee Code
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Employee Code"
                value={sendForm.employeeCode}
                name="employeeCode"
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-3 mt-2">
              <label for="exampleFormControlInput1" className="form-label">
                Employee Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Employee Name"
                value={sendForm.employeeName}
                name="employeeName"
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-3 mt-2">
              <label for="exampleFormControlInput1" className="form-label">
                Date Of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dateOfBirth"
                placeholder="Enter Date Of Birth"
                value={sendForm.dateOfBirth}
                name="dateOfBirth"
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-3 mt-2">
              <label for="exampleFormControlInput1" className="form-label">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                className="form-control"
                onChange={handleChange}
              >
                <option value="0">Select</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
            </div>
            <div className="col-3">
              <label for="exampleFormControlInput1" className="form-label">
                Department
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={sendForm.department}
                name="department"
                placeholder="Enter Department"
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-3 mt-2">
              <label for="exampleFormControlInput1" className="form-label">
                Designation
              </label>
              <input
                type="text"
                className="form-control"
                value={sendForm.designation}
                name="designation"
                id="exampleFormControlInput1"
                placeholder="Enter Designation"
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-3 mt-2">
              <label for="exampleFormControlInput1" className="form-label">
                Basic Salary
              </label>
              <input
                type="number"
                className="form-control"
                value={sendForm.basicSalary}
                name="basicSalary"
                id="exampleFormControlInput1"
                placeholder="Enter Basic Salary"
                onChange={handleChange}
              ></input>
            </div>

            {updatebool === 0 ? (
              <div className="col-1 mt-2">
                <button
                  id="liveToastBtn"
                  type="button"
                  class="form-control btn btn-success"
                  style={{ marginTop: "30px" }}
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="col-1 mt-2">
                <button
                  type="button"
                  class="form-control btn btn-success"
                  style={{ marginTop: "30px" }}
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            )}
            <div className="col-1 mt-2">
              <button
                type="button"
                class="form-control btn btn-warning"
                style={{ marginTop: "30px" }}
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Get List */}
      <div className=" mt-5 border border-info">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S. No.</th>
              <th scope="col">Employee Code</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Date Of Birth</th>
              <th scope="col">Gender</th>
              <th scope="col">Department</th>
              <th scope="col">Designation</th>
              <th scope="col">Basic Salary</th>
              <th scope="col">DearnessAllowance</th>
              <th scope="col">ConveyanceAllowance</th>
              <th scope="col">HouseRentAllowance</th>
              <th scope="col">PT</th>
              <th scope="col">TotalSalary</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {employeeList.length > 0 ? (
            <tbody>
              {employeeList &&
                employeeList.map((key, ind) => {
                  let dob = key.dateOfBirth.split("T")[0];
                  return (
                    <tr>
                      <th scope="row">{ind + 1}</th>
                      <td>{key.employeeCode}</td>
                      <td>{key.employeeName}</td>
                      <td>{dob}</td>
                      <td>{key.gender === true ? "Male" : "Female"}</td>
                      <td>{key.department}</td>
                      <td>{key.designation}</td>
                      <td>{key.basicSalary}</td>
                      <td>{key.dearnessAllowance}</td>
                      <td>{key.conveyanceAllowance}</td>
                      <td>{key.houseRentAllowance}</td>
                      <td>{key.pt}</td>
                      <td>{key.totalSalary}</td>
                      <td>
                        <div className="row">
                          <div className="col-1 mt-2">
                            <button
                              type="button"
                              class=" editbtn btn btn-outline-warning"
                              onClick={() =>
                                handleEdit(
                                  key.id,
                                  key.employeeCode,
                                  key.employeeName,
                                  dob,
                                  key.gender,
                                  key.department,
                                  key.designation,
                                  key.basicSalary
                                )
                              }
                            >
                              <i class="bi bi-pencil-square"></i>
                            </button>
                          </div>
                          &nbsp;&nbsp;
                          <div className="col-1 mt-2">
                            <button
                              type="button"
                              class="editbtn btn btn-outline-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => setRowId(key.id)}
                            >
                              <i class="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          ) : (
            <div className=" pt-3 position-absolute top-150 start-50 translate-middle">
              No record found
            </div>
          )}
        </table>
      </div>

      {/*Delete Modal */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Alert
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">Are you sure you want to delete?</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
