import React from 'react';

function PlanEditor({plan}) {
  console.dir(plan);
  return (
    <div className="plan-editor">
      <h3>PlanEditor</h3>
      <p>{ plan ? plan : 'nothing selected...'}</p>
    </div>
  );
}

export default PlanEditor;
