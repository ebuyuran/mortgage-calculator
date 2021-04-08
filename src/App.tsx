import styled from 'styled-components';
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

// These values will be obtained from an end-point later.
const initialFormValues: FormValues = {
  propertyValue: 1200000,
  downPaymentAmount: 240000,
  downPaymentPercentage: -1,     // just to avoid TS error as it expects a number.
  minimumDownPaymentPercentage: -1, // dummy data will be corrected just below.
  maximumDownPaymentPercentage: 80, 
  loanTermInMonths: 300,
  interestRatePerYear: 2.49
}

// get the correct values.
initialFormValues.minimumDownPaymentPercentage = 
  getMinimumDownPaymentPercentage(initialFormValues.propertyValue);

initialFormValues.downPaymentPercentage = 
  getDownPaymentPercentageFromInitialValues(
    initialFormValues.propertyValue, 
    initialFormValues.downPaymentAmount,
    initialFormValues.minimumDownPaymentPercentage,
    initialFormValues.maximumDownPaymentPercentage
  );

function App() {
  return (
    <StyledApp>
      <MortgageCalculator initialValues={initialFormValues} />
    </StyledApp>
  );
}

export default App;
