import React from "react";
import { useSelector } from "react-redux";
import "../css/OBGYN.css";

const columns = [
  {
    label: "Name",
    key: "name",
    render: ({ tenant }) => (
      <>
        <span>
          {tenant.name
            ?.split(" ")
            .map((w) => w.charAt(0))
            .join("")
            .toUpperCase()}
        </span>{" "}
        {tenant.name || "—"}
      </>
    ),
  },
  { label: "Domain", key: "domain" },
  { label: "ID", key: "id" },
  { label: "Address", key: "address" },

  { label: "Type", key: "type" },

  {
    label: "Organisations",
    key: "org",
    render: ({ tenant }) => (
      <div
        style={{
          width: "80%",
          margin: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>{tenant?._count?.OrganizationTenant || "—"}</span>
      </div>
    ),
  },
  {
    label: "Created at",
    key: "joined",

    render: ({ tenant }) =>
      tenant.createdAt
        ? new Date(tenant.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "—",
  },
];

const Hospitals = () => {
  const tenants = useSelector((s) => s.tenant.tenants);


  return (
    <div className="users-page">
      <div className="toolbar">
        <div className="count">
          All Tenants <span>{tenants?.length || 0}</span>
        </div>
        <div className="search"></div>
      </div>

      <div className="lists">
        <div className="title">
          {columns.map((col) => (
            <div key={col.key} className={col.key}>
              {col.label}
            </div>
          ))}
        </div>

        {tenants?.length > 0 ? (
          tenants.map((tenant) => (
            <div className="list" key={tenant.id}>
              {columns.map((col) => (
                <div key={col.key} className={col.key}>
                  {col.render ? col.render({ tenant }) : tenant[col.key] || "—"}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="no-results">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default Hospitals;
