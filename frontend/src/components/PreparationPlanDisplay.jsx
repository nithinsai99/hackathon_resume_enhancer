import React from "react";

const PreparationPlanDisplay = ({ prepSchedule }) => (
  <div
    className="bg-white shadow rounded p-6 mt-6"
    dangerouslySetInnerHTML={{ __html: prepSchedule }}
  />
);

export default PreparationPlanDisplay;
