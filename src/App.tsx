import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CookiesProvider, useCookies } from 'react-cookie';
import axios, { AxiosError, AxiosResponse } from 'axios';
import MortgageCalculator from './MortgageCalculator/MortgageCalculator';
import { getMinimumDownPaymentPercentage } from './MortgageCalculator/helpers';
import { FormValues } from './MortgageCalculator/types';

const StyledApp = styled.div`
  width: 48em;
  border-radius: .3em;
`;

function getDownPaymentPercentageFromInitialValues(
  propertyValue: number, 
  downPaymentAmount: number, 
  minimumDownPaymentPercentage: number, 
  maximumDownPaymentPercentage: number
) {
  const calculatedPercentage = (downPaymentAmount * 100) / propertyValue;
  if (
      // Let's ensure that calculated percentage stands
      // within min/max values.
      calculatedPercentage < minimumDownPaymentPercentage || 
      calculatedPercentage > maximumDownPaymentPercentage
    ) {
    // If not, proceed with the minimum.
    return minimumDownPaymentPercentage
  } else {
    return calculatedPercentage
  }
}

type DefaultFormValues = {
  loan: {
    downpayment_amount: number;
    interest_rate_per_year: number;
    loan_term_in_months: number;
    property_value: number;
  }
}

function App() {
  const [cookies] = useCookies(['mortgage-calculator']);
  const [initialFormValues, setInitialFormValues] = useState<FormValues | null>(null);
  const [serverError, setServerError] = useState<boolean>(false);
  const mortgageCookie: FormValues = cookies['mortgage-calculator'];

  useEffect(() => {
    if (mortgageCookie) {
      setInitialFormValues({ ...mortgageCookie });
    } else {
      axios.get<DefaultFormValues>('https://www.mortgagefinder.ae/mortgage-calculator-challenge.php')
      .then(function(response: AxiosResponse) {
        const defaultFormValues: FormValues = {
          propertyValue: Number(response.data.loan.property_value),
          downPaymentAmount: Number(response.data.loan.downpayment_amount),
          downPaymentPercentage: -1,          // just to avoid TS error as it expects a number.
          minimumDownPaymentPercentage: -1,   // dummy data will be corrected below.
          maximumDownPaymentPercentage: 80,
          loanTermInMonths: Number(response.data.loan.loan_term_in_months),
          interestRatePerYear: Number(response.data.loan.interest_rate_per_year)
        };

        defaultFormValues.minimumDownPaymentPercentage = 
          getMinimumDownPaymentPercentage(defaultFormValues.propertyValue);

        defaultFormValues.downPaymentPercentage = 
          getDownPaymentPercentageFromInitialValues(
            defaultFormValues.propertyValue, 
            defaultFormValues.downPaymentAmount,
            defaultFormValues.minimumDownPaymentPercentage,
            defaultFormValues.maximumDownPaymentPercentage
          );

        setInitialFormValues(defaultFormValues);
      })
      .catch(function(_: AxiosError) {
        setServerError(true);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (serverError) {
    return <div>server error</div>
  }

  if (initialFormValues === null) {
    return <div>spinner</div>
  } else {
    return (
      <StyledApp>
        <MortgageCalculator initialValues={initialFormValues} />
      </StyledApp>
    );
  }
}

export default function AppContainer() {
  return (
    <CookiesProvider>
      <App />
    </CookiesProvider>
  )
};
