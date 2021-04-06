import { useState } from 'react';
import styled from 'styled-components';
import PaymentDetails from './PaymentDetails/PaymentDetails';
import { ThemeTypes, FormValues } from './types';
import { theme } from './theme';
import { getMinimumDownPaymentPercentage } from './helpers';

function MortgageCalculator() {
	const [activeTheme, setActiveTheme] = useState<ThemeTypes>('light');

	const StyledMortgageCalculator = styled.div`
		min-height: 3em;
		border-radius: .4em;
		padding: 1.6em;
		background: ${theme[activeTheme].background};
	`;

	function getdown_paymentPercentageFromInitialValues(
			propertyValue: number, 
			downPaymentAmount: number, 
			downPaymentPercentageMin: number, 
			downPaymentPercentageMax: number
		) {

		const calculatedPercentage = (downPaymentAmount * 100) / propertyValue;

		if (
				// Let's ensure that calculated percentage stands
				// within min/max values.
				calculatedPercentage < downPaymentPercentageMin || 
				calculatedPercentage > downPaymentPercentageMax
			) {
			// If not, proceed with the minimum.
			return downPaymentPercentageMin
		} else {
			return calculatedPercentage
		}
	}

	// These values will be obtained from an end-point later.
	const initialFormValues: FormValues = {
		propertyValue: 1200000,
		downPaymentAmount: 240000,
		downPaymentPercentage: -1,     // just to avoid TS error as it expects a number.
		downPaymentPercentageMin: -1, // dummy data will be corrected just below.
		downPaymentPercentageMax: 80, 
		loanTermInMonths: 300,
		interestRatePerYear: 2.49
	}

	// get the correct values.
	initialFormValues.downPaymentPercentageMin = 
		getMinimumDownPaymentPercentage(initialFormValues.propertyValue);

	initialFormValues.downPaymentPercentage = 
		getdown_paymentPercentageFromInitialValues(
			initialFormValues.propertyValue, 
			initialFormValues.downPaymentAmount,
			initialFormValues.downPaymentPercentageMin,
			initialFormValues.downPaymentPercentageMax
		);

	return <StyledMortgageCalculator>
		<PaymentDetails initialFormValues={initialFormValues} activeTheme={activeTheme} />
	</StyledMortgageCalculator>
};

export default MortgageCalculator;
