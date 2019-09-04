import React from 'react';
import PropTypes from 'prop-types';

import PlanNav from './PlanNav';
import PlanService from './../utils/plans';

function PlanExplorer({plans, loading}) {
  const plansExpanded = plans.map((plan, i) => {
    const onClick = () => { PlanService.select(plan.id) };
    return <PlanNav key={i} plan={plan} click={onClick} />;
  });
  const noPlans = <div>there are no plans...</div>;
  const loadingPlans = <div>loading your plans...</div>;
  return (
    <div className="plan-explorer">
      <h3>PlanExplorer ({`${loading}`})</h3>
      { plans.length === 0
          ? (loading === false ? noPlans : loadingPlans)
          : plansExpanded }
    </div>
  );
}

PlanExplorer.propTypes = {
  plans: PropTypes.array,  // TODO: add here more detailed type checking
  loading: PropTypes.bool,
}
PlanExplorer.defaultProps = {
  plans: [],
  loading: false,
}

export default PlanExplorer;
