import { BACKEND_BASE_URL } from '../constans';
import { request } from './request';
import { ReplaySubject } from 'rxjs';

const url = `${BACKEND_BASE_URL}/plans`;

const selectedPlanId$ = new ReplaySubject(1);

function addPlan$(plan) {
  return request.post(url, null, plan);
}

function getAllPlans$() {
  return request.get(url);
}

function getPlanById$(id) {
  return request.get(`${url}/${id}`);
}

function selectPlanById(id) {
  selectedPlanId$.next(id);
}

const PlansService = {
  add: addPlan$,
  getAll: getAllPlans$,
  getById: getPlanById$,
  selectedPlanId$: selectedPlanId$.asObservable(),
  select: selectPlanById,
};

export default PlansService;
