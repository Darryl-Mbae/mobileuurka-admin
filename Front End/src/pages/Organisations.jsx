import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import "../css/OBGYN.css";
import SearchContainer from "../components/SearchContainer";

const columns = [
  {
    label: "Organisations",
    key: "name",
    render: ({ organisation }) => (
      <>
        <span>
          {organisation?.name
            ?.split(" ")
            .map((w) => w.charAt(0))
            .join("")
            .toUpperCase()}
        </span>{" "}
        {organisation?.name || "—"}
      </>
    ),
  },
  { label: "ID", key: "id" },

  {
    label: "Owner Email",
    key: "owner-email",
    render: ({ organisation }) => organisation?.owner?.email || "—",
  },

  {
    label: "Owner",
    key: "owner",
    render: ({ organisation }) => organisation?.owner?.name || "—",
  },
  {
    label: "Users",
    key: "users",
    render: ({ organisation }) => organisation?.users?.length || "—",
  },

  {
    label: "Updated",
    key: "updated",
    render: ({ organisation }) =>
      organisation?.updatedAt
        ? new Date(organisation.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "—",
  },

  {
    label: "Created",
    key: "joined",
    render: ({ organisation }) =>
      organisation?.createdAt
        ? new Date(organisation.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "—",
  },
];
const Organisations = () => {
  const organisations = useSelector((s) => s.organisation.organisations);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrganisations, setFilteredOrganisations] = useState([]);

  useEffect(() => {
    // Filter organisations based on search term
    if (!searchTerm.trim()) {
      setFilteredOrganisations(organisations || []);
    } else {
      const filtered = (organisations || []).filter(organisation => 
        organisation.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        organisation.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        organisation.owner?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        organisation.owner?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrganisations(filtered);
    }
  }, [organisations, searchTerm]);

  const handleSearch = useCallback((searchValue) => {
    setSearchTerm(searchValue);
  }, []);

  return (
    <div className="users-page">
      <div className="toolbar">
        <div className="count">
          All Organisations <span>{filteredOrganisations?.length || 0}</span>
          {searchTerm && (
            <span className="search-info">
              {filteredOrganisations?.length !== organisations?.length && 
                ` (${organisations?.length || 0} total)`
              }
            </span>
          )}
        </div>
        
        <SearchContainer
          placeholder="Search organisations by name, ID, or owner..."
          onSearch={handleSearch}
          showAddButton={false} // No add button for organisations
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

        {filteredOrganisations?.length > 0 ? (
          filteredOrganisations.map((organisation) => (
            <div className="list" key={organisation.id}>
              {columns.map((col) => (
                <div key={col.key} className={col.key}>
                  {col.render
                    ? col.render({ organisation })
                    : organisation[col.key] || "—"}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="no-results">
            {searchTerm ? `No organisations found matching "${searchTerm}"` : "No organisations found."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Organisations;
