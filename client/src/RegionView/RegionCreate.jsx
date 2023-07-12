import React, { useState } from "react";
import RegionApi from "../api/regionApi";

export default function RegionCreate(props) {
  const [value, setValue] = useState({
    name: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue({ ...value, [name]: value });
  };
  const onSubmit = async (event) => {
    event.preventDefault()
    const payload = {
      name: value.name,
    };
    await RegionApi.create(payload).then(() => {
      props.setRefresh(true);
      window.alert("Data success Create");
    });
  };
  return (
    <div>
      <h2>Add Regions</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Region Name :</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={value.name}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <button type="submit">Simpan</button>
          <button onClick={() => props.setDisplay(false)}>cancel</button>
        </div>
      </form>
    </div>
  );
}