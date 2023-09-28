import * as yup from 'yup';

export const employeeValidationSchema = yup.object().shape({
  hire_date: yup.date().nullable(),
  termination_date: yup.date().nullable(),
  salary: yup.number().integer().nullable(),
  position: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
