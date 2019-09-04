import React from 'react';

import './PlanNav.css';

function PlanNav({plan, click}) {
  // console.dir(plan);
  return (
    <div className="plan-nav" onClick={click}>
      <div className="plan-nav-name">{plan.name}</div>
      <div className="plan-nav-description">{plan.description}</div>
    </div>
  );
}

export default PlanNav;