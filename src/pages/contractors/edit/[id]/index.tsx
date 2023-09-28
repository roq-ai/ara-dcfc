import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getContractorById, updateContractorById } from 'apiSdk/contractors';
import { contractorValidationSchema } from 'validationSchema/contractors';
import { ContractorInterface } from 'interfaces/contractor';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function ContractorEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ContractorInterface>(
    () => (id ? `/contractors/${id}` : null),
    () => getContractorById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ContractorInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateContractorById(id, values);
      mutate(updated);
      resetForm();
      router.push('/contractors');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ContractorInterface>({
    initialValues: data,
    validationSchema: contractorValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Contractors',
              link: '/contractors',
            },
            {
              label: 'Update Contractor',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Contractor
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="contract_start_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Contract Start Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.contract_start_date ? new Date(formik.values?.contract_start_date) : null}
              onChange={(value: Date) => formik.setFieldValue('contract_start_date', value)}
            />
          </FormControl>
          <FormControl id="contract_end_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Contract End Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.contract_end_date ? new Date(formik.values?.contract_end_date) : null}
              onChange={(value: Date) => formik.setFieldValue('contract_end_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Hourly Rate"
            formControlProps={{
              id: 'hourly_rate',
              isInvalid: !!formik.errors?.hourly_rate,
            }}
            name="hourly_rate"
            error={formik.errors?.hourly_rate}
            value={formik.values?.hourly_rate}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('hourly_rate', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Max Hours Per Week"
            formControlProps={{
              id: 'max_hours_per_week',
              isInvalid: !!formik.errors?.max_hours_per_week,
            }}
            name="max_hours_per_week"
            error={formik.errors?.max_hours_per_week}
            value={formik.values?.max_hours_per_week}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('max_hours_per_week', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/contractors')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'contractor',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ContractorEditPage);
