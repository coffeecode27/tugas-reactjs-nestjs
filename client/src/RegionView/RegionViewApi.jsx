import React, { useEffect, useState } from "react";
import RegionApi from "../api/regionApi";
import RegionCreate from "./RegionCreate";
import RegionUpdate from "./RegionUpdate";

export default function RegionViewApi() {
  const [region, setRegion] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [display, setDisplay] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);

 
  useEffect(() => {
    RegionApi.list().then((data) => {
      setRegion(data.data);
    });
    setRefresh(false);
  }, [refresh]);

  const onDelete = async (id) => {
    RegionApi.deleted(id).then(() => {
      window.alert("Data successfully deleted");
      setRefresh(true);
    });
  };


  const onUpdate = async (id, name) => {
    try {
      await RegionApi.update(id, { name });
      window.alert("Data successfully updated");
      setRefresh(true);
      setSelectedRegion(null);
    } catch (error) {
      window.alert("Failed to update data");
      console.error(error);
    }
  };

  return (
    <div>
      {display ? (
        <RegionCreate setRefresh={setRefresh} setDisplay={setDisplay} />
      ) : (
        <>
          <h2>List Regions</h2>
          <button onClick={() => setDisplay(true)}>Add Regions</button>
          <table>
            <th>Region ID</th>
            <th>Region Name</th>
            <th>Action</th>
            <tbody>
              {region && region.map((reg) => (
                  <tr key={reg.regionId}>
                    <td>{reg.regionId}</td>
                    <td>{reg.regionName}</td>
                    <td>
                      <button onClick={() => onDelete(reg.regionId)}>
                        Delete
                      </button>
                      <button onClick={() => setSelectedRegion(reg)}>
                      Edit
                    </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
      {selectedRegion && (
        <RegionUpdate
          region={selectedRegion}
          onUpdate={onUpdate}
          onCancel={() => setSelectedRegion(null)}
        />
      )}
    </div>
  );
}