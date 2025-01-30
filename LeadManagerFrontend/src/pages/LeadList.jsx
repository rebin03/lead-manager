import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LeadList() {
  const [leads, setLeads] = useState();

  useEffect(() => {
    fetchAllLeadsApi();
  }, []);

  async function fetchAllLeadsApi() {

    let token = localStorage.getItem("token")
    let headers = {"Authorization": token}

    let response = await axios.get("http://127.0.0.1:8000/api/leads/", {headers});
    if (response.status >= 200 && response.status < 300) {
      console.log(response.data);
      setLeads(response.data);
    }
  }

  async function  leadDeleteApi(id) {

    let token = localStorage.getItem("token")
    let headers = {"Authorization": token}

    let response = await axios.delete(`http://127.0.0.1:8000/api/leads/${id}/`, {headers})
    if(response.status >= 200 && response.status < 300){
        fetchAllLeadsApi()
    }
  }

  async function handleChange(event) {

    let token = localStorage.getItem("token")
    let headers = {"Authorization": token}

    let searchValue = event.target.value
    
    let response = await axios.get(`http://127.0.0.1:8000/api/leads?search_text=${searchValue}`, {headers})
    if(response.status >= 200 && response.status < 300){
      setLeads(response.data)
    }
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="card p-4">
          <h2 className="text-center mb-4">Leads List</h2>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                id="searchBar"
                placeholder="Search leads by name, email, or mobile"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 text-end">
              <Link  
                className="btn btn-primary" 
                to={"/leadcreate"}>  
                <i className="bi bi-plus-circle"></i> Add New Lead
              </Link>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>College</th>
                  <th>Qualification</th>
                  <th>Source</th>
                  <th>Course</th>
                  <th>Course Mode</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="leadTableBody">
                {
                    leads?.map((l, index) => (
                        <tr>
                            <td>{index+1}</td>
                            <td>{l.name}</td>
                            <td>{l.mobile}</td>
                            <td>{l.email}</td>
                            <td>{l.college}</td>
                            <td>{l.qualification}</td>
                            <td>{l.source}</td>
                            <td>{l.course}</td>
                            <td>{l.course_mode}</td>
                            <td>{l.status}</td>
                            <td>
                                <div className="d-flex justify-content-around gap-2">
                                <Link
                                    to={`/leadedit/${l.id}`}
                                    className="btn btn-success btn-action"
                                >
                                    <i className="bi bi-pencil"></i>
                                </Link>
                                <button
                                    className="btn btn-danger btn-action"
                                    title="Delete"
                                    onClick={() => leadDeleteApi(l.id)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadList;
