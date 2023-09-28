import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ContractorInterface {
  id?: string;
  contract_start_date?: any;
  contract_end_date?: any;
  hourly_rate?: number;
  max_hours_per_week?: number;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ContractorGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
