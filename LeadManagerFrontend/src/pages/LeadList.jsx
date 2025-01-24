import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LeadList() {
  const [leads, setLeads] = useState();

  const navigate = useNavigate()

  useEffect(() => {
    fetchAllLeadsApi();
  }, []);

  async function fetchAllLeadsApi() {
    let response = await axios.get("http://127.0.0.1:8000/api/leads/");
    if (response.status >= 200 && response.status < 300) {
      console.log(response.data);
      setLeads(response.data);
    }
  }

  async function  leadDeleteApi(id) {
    let response = await axios.delete(`http://127.0.0.1:8000/api/leads/${id}/`)
    if(response.status >= 200 && response.status < 300){
        fetchAllLeadsApi()
    }
  }

  function leadListNavigate(){
    navigate("/leadlist")
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
                                <a
                                    href="#"
                                    className="btn btn-success btn-action"
                                    title="Edit"
                                >
                                    <i className="bi bi-pencil"></i>
                                </a>
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
