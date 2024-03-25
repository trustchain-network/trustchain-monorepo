import { useCallback } from 'react';
import useFetch from '../use-fetch';
import { API_URL } from '../config';
import wrapperFetchJsonResponse from '../wrapper-fetch-json-response';
import { InfinityPaginationType } from '../types/infinity-pagination';
import { SortEnum } from '../types/sort-type';
import { RequestConfigType } from './types/request-config';
import { NfcCategory } from '../types/nfc-category';

export type NfcCategoriesRequest = {
  page: number;
  limit: number;
  sort?: Array<{
    orderBy: keyof NfcCategory;
    order: SortEnum;
  }>;
};

export type UsersResponse = InfinityPaginationType<NfcCategory>;

export function useNfcCategoriesService() {
  const fetch = useFetch();

  return useCallback(
    (data: NfcCategoriesRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/nfc-categories`);
      requestUrl.searchParams.append('page', data.page.toString());
      requestUrl.searchParams.append('limit', data.limit.toString());
      if (data.sort) {
        requestUrl.searchParams.append('sort', JSON.stringify(data.sort));
      }

      return fetch(requestUrl, {
        method: 'GET',
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<UsersResponse>);
    },
    [fetch],
  );
}

export type NfcCategoryRequest = {
  id: NfcCategory['id'];
};

export type NfcCategoryResponse = NfcCategory;

export function useGetNfcCategoryService() {
  const fetch = useFetch();

  return useCallback(
    (data: NfcCategoryRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/nfc-categories/${data.id}`, {
        method: 'GET',
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<NfcCategoryResponse>);
    },
    [fetch],
  );
}

export type NfcCategoryPostRequest = Pick<
  NfcCategory,
  'name' | 'description'
> & {
  password: string;
};

export type NfcCategoryPostResponse = NfcCategory;

export function usePostNfcCategoryService() {
  const fetch = useFetch();

  return useCallback(
    (data: NfcCategoryPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/nfc-categories`, {
        method: 'POST',
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<NfcCategoryPostResponse>);
    },
    [fetch],
  );
}

export type NfcCategoryPatchRequest = {
  id: NfcCategory['id'];
  data: Partial<
    Pick<NfcCategory, 'name' | 'description'> & {
      password: string;
    }
  >;
};

export type NfcCategoryPatchResponse = NfcCategory;

export function usePatchNfcCategoryService() {
  const fetch = useFetch();

  return useCallback(
    (data: NfcCategoryPatchRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/nfc-categories/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<NfcCategoryPatchResponse>);
    },
    [fetch],
  );
}

export type NfcCategoriesDeleteRequest = {
  id: NfcCategory['id'];
};

export type NfcCategoriesDeleteResponse = undefined;

export function useDeleteNfcCategoriesService() {
  const fetch = useFetch();

  return useCallback(
    (data: NfcCategoriesDeleteRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/nfc-categories/${data.id}`, {
        method: 'DELETE',
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<NfcCategoriesDeleteResponse>);
    },
    [fetch],
  );
}
