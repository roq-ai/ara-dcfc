import queryString from 'query-string';
import { ContractorInterface, ContractorGetQueryInterface } from 'interfaces/contractor';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getContractors = async (
  query?: ContractorGetQueryInterface,
): Promise<PaginatedInterface<ContractorInterface>> => {
  return fetcher('/api/contractors', {}, query);
};

export const createContractor = async (contractor: ContractorInterface) => {
  return fetcher('/api/contractors', { method: 'POST', body: JSON.stringify(contractor) });
};

export const updateContractorById = async (id: string, contractor: ContractorInterface) => {
  return fetcher(`/api/contractors/${id}`, { method: 'PUT', body: JSON.stringify(contractor) });
};

export const getContractorById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/contractors/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteContractorById = async (id: string) => {
  return fetcher(`/api/contractors/${id}`, { method: 'DELETE' });
};
