import React from "react";

export default function InterviewPopup({ daysLeft, setDaysLeft, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Enter Days Until Interview</h3>
        <input
          type="number"
          value={daysLeft}
          onChange={(e) => setDaysLeft(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          min={1}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onCancel} className="px-4 py-2 rounded border">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
