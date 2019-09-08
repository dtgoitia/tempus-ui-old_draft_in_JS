import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './PlanEditor.css';

function NothingSelected() {
  return (
    <div className="plan-editor nothing-selected">
      <p>Please, select a plan.</p>
    </div>
  );
}

function PlanIsLoading() {
  return (
    <div className="plan-editor loading">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

function PlanEditor({plan, loading}) {
  if (!plan) {
    return loading
      ? PlanIsLoading()
      : NothingSelected();
  }

  const description = plan.description
    ? <div id="description">{ plan.description }</div>  // TODO: description is arriving as a string, update API to be JSON
    : <div id="description" className="missing">No descrjiption.</div>

  return (
    <div className="plan-editor">
      <h3>PlanEditor</h3>
      { description }
      { JSON.stringify(plan) }
    </div>
  );
}

export default PlanEditor;
