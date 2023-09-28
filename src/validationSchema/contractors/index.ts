import * as yup from 'yup';

export const contractorValidationSchema = yup.object().shape({
  contract_start_date: yup.date().nullable(),
  contract_end_date: yup.date().nullable(),
  hourly_rate: yup.number().integer().nullable(),
  max_hours_per_week: yup.number().integer().nullable(),
  user_id: yup.string().nullable().required(),
});
