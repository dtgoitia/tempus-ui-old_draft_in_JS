import React from 'react';
import PropTypes from 'prop-types';
import { tap, switchMap } from 'rxjs/operators';

import './Planner.css';
import PlanExplorer from './PlanExplorer';
import PlanEditor from './PlanEditor';
import PlansService from '../utils/plans';

function logRequestLifecycle(requestEmission) {
  requestEmission.loading
    ? console.log(`loading$: IN-FLIGHT ${requestEmission.requestInfo}`)
    : console.log(`loading$: COMPLETED ${requestEmission.requestInfo}`);
}

class Planner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const getAllPlansSubscription = PlansService.getAll()
      .pipe(tap(logRequestLifecycle))
      .subscribe(emission => {
        this.setState({ loading: emission.loading });
        if (emission.response && emission.loading === false) {
          this.setState({ plans: emission.response });
        }
      });

    const selectedPlanSubscription = PlansService.selectedPlanId$
      .pipe(
        switchMap(id => PlansService.getById(id)),
        tap(logRequestLifecycle),
      )
      .subscribe(emission => {
        this.setState({
          loadingSelectedPlan: emission.loading,
          selectedPlan: null,
        });
        if (emission.response && emission.loading === false) {
          this.setState({ selectedPlan: emission.response });
        }
      });

    this.subscriptions = [
      getAllPlansSubscription,
      selectedPlanSubscription,
    ];
  }

  componentWillUnmount() {
    this.cleanUpSubscriptions();
  }

  render() {
    return (
      <div className="planner">
        <PlanExplorer plans={this.state.plans} loading={this.state.loading} />
        <PlanEditor
          plan={this.state.selectedPlan}
          loading={this.state.loadingSelectedPlan} />
      </div>
    );
  }

  cleanUpSubscriptions() {
    if (!!this.subscriptions) {
      this.subscriptions.forEach(subs => {
        subs.unsubscribe();
      })
    }
    // if (!!this.subscription && !this.subscription.closed) {
    //   this.subscription.unsubscribe();
    // }
  }
}

PlanExplorer.propTypes = {
  plans: PropTypes.array,  // TODO: add here more detailed type checking
  loading: PropTypes.bool,
}
PlanExplorer.defaultProps = {
  plans: [],
  loading: false,
}

export default Planner;
