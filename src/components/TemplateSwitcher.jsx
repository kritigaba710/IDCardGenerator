import React from 'react';

const TemplateSwitcher = ({ selected, onChange }) => {
  return (
    <div className="my-4 text-center flex flex-col gap-2 items-center justify-center">
      <div><label className="font-semibold text-2xl text-white">Choose Template:</label></div>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="border mr-32 bg-zinc-800 text-white px-4 py-2 ml-28 cursor-pointer text-xl rounded"
      >
        <option value="template1">Template1</option>
        <option value="template2">Template2</option>
      </select>
    </div>
  );
};

export default TemplateSwitcher;
