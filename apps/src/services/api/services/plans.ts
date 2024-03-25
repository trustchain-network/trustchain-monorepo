import { useCallback } from 'react';
import useFetch from '../use-fetch';
import { API_URL } from '../config';
import wrapperFetchJsonResponse from '../wrapper-fetch-json-response';
import { RequestConfigType } from './types/request-config';
import { Plan } from '../types/plan';

export type PlansResponse = Plan[];

export function useGetPlansService() {
  const fetch = useFetch();

  return useCallback(
    (requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/plans`);

      return fetch(requestUrl, {
        method: 'GET',
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<PlansResponse>);
    },
    [fetch],
  );
}

export type PlanRequest = {
  id: Plan['id'];
};

export type PlanResponse = Plan;

export function useGetPlanService() {
  const fetch = useFetch();

  return useCallback(
    (data: any, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/plans/${data.id}`, {
        method: 'GET',
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<PlanRequest>);
    },
    [fetch],
  );
}

export type PlanPostRequest = Pick<
  Plan,
  'name' | 'description' | 'price' | 'currency' | 'duration' | 'durationType'
>;

export type PlanPostResponse = Plan;

export function usePostPlanService() {
  const fetch = useFetch();

  return useCallback(
    (data: PlanPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/plans`, {
        method: 'POST',
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<PlanPostResponse>);
    },
    [fetch],
  );
}

export type PlanPatchRequest = {
  id: Plan['id'];
  data: Partial<
    Pick<
      Plan,
      | 'name'
      | 'description'
      | 'price'
      | 'currency'
      | 'duration'
      | 'durationType'
    >
  >;
};

export type PlanPatchResponse = Plan;

export function usePatchPlanService() {
  const fetch = useFetch();

  return useCallback(
    (data: PlanPatchRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/plans/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<PlanPatchResponse>);
    },
    [fetch],
  );
}

export type PlansDeleteRequest = {
  id: Plan['id'];
};

export type PlansDeleteResponse = undefined;

export function useDeletePlansService() {
  const fetch = useFetch();

  return useCallback(
    (data: PlansDeleteRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/users/${data.id}`, {
        method: 'DELETE',
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<PlansDeleteResponse>);
    },
    [fetch],
  );
}
