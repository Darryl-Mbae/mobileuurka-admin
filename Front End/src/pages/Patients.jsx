import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/Patients.css";
import { setPatients } from "../realtime/Slices/patientsSlice";
import SearchContainer from "../components/SearchContainer";

const columns = [
  { label: "Name", key: "name" },
  { label: "ID", key: "id" },
  {
    label: "National ID",
    key: "patientId",
    render: ({ patient }) => maskId(patient.patientId),
  },  
  {
    label: "Hospital",
    key: "hospital",
    render: ({ patient }) =>  patient.hospital || "—",
  },
  {
    label: "Risk",
    key: "risk",
    render: ({ patient }) => patient.risk || "—",
  },

  {
    label: "Reason",
    key: "reason",
    render: ({ patient }) => patient.reasonForVisit || "—",
  },
  {
    label: "Suspected Diagnosed Diseases",
    key: "suspected",
    render: ({ patient }) =>
      patient.suspectedDiseases?.length
        ? patient.suspectedDiseases.join(", ")
        : "—",
  },
];

function maskId(id) {
  if (!id) return '—'; // fallback for missing/null/undefined
  if (typeof id !== 'string') id = String(id);

  const lastFour = id.slice(-4);
  return `**********${lastFour}`;
}


const Patients = ({ setActiveItem , setSelectedPatientId}) => {
  const dispatch = useDispatch();
  const SERVER = import.meta.env.VITE_SERVER_URL;
  const patients = useSelector((state) => state.patient.patients);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);


  useEffect(() => {
    fetchPatients();
  }, []);


  

  useEffect(() => {
    // Filter patients based on search term
    if (!searchTerm.trim()) {
      setFilteredPatients(patients || []);
    } else {
      const filtered = (patients || []).filter(patient => 
        patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.patientId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.hospital?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.reasonForVisit?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.suspectedDiseases?.some(disease => 
          disease.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredPatients(filtered);
    }
  }, [patients, searchTerm]);

  async function fetchPatients() {
    try {
      const res = await fetch(`${SERVER}/patients/all`, {
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);


      // Optional: transform or normalize data
      const transformed = data.map((p) => ({
        ...p,
      }));

      dispatch(setPatients(transformed));
    } catch (err) {
      console.error("Failed to fetch patients:", err);
    }
  }

  const handleClick = (patientId) => {
    setSelectedPatientId(patientId);
    setActiveItem("Patient");
  };

  const handleSearch = useCallback((searchValue) => {
    setSearchTerm(searchValue);
  }, []);

  return (
    <div className="patients-page">
      <div className="toolbar">
        <div className="count">
          All Patients <span>{filteredPatients?.length || 0}</span>
          {searchTerm && (
            <span className="search-info">
              {filteredPatients?.length !== patients?.length && 
                ` (${patients?.length || 0} total)`
              }
            </span>
          )}
        </div>
        
        <SearchContainer
          placeholder="Search patients by name, ID, hospital, or condition..."
          onSearch={handleSearch}
          showAddButton={false} // No add button for patients
          searchValue={searchTerm}
        />
      </div>

      <div className="lists">
        <div className="title">
          {columns.map((col) => (
            <div key={col.key} className={col.key}>
              {col.label}
            </div>
          ))}
        </div>

        {filteredPatients?.length > 0 ? (
          filteredPatients.map((patient) => (
            <div className="list" key={patient.id} onClick={() => handleClick(patient.patientId)}>
              {columns.map((col) => (
                <div key={col.key} className={col.key}>
                  {col.render
                    ? col.render({ patient })
                    : patient[col.key] || "—"}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="no-results">
            {searchTerm ? `No patients found matching "${searchTerm}"` : "No patients found."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
