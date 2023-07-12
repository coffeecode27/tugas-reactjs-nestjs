import React, { useState } from "react";

export default function RegionUpdate({ region, onUpdate, onCancel }) {
  const [name, setName] = useState(region.regionName);

  const handleUpdate = () => {
    onUpdate(region.regionId, name);
  };

  return (
    <div>
      <h2>Update Region</h2>
      <form>
        <div>
          <label>Region Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
