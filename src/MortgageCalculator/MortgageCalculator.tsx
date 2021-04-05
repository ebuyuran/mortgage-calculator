import { useState } from 'react';
import styled from 'styled-components';
import PaymentDetails from './PaymentDetails/PaymentDetails';
import { ThemeTypes, FormValues } from './types';
import { theme } from './theme';

function MortgageCalculator() {
	const [activeTheme, setActiveTheme] = useState<ThemeTypes>('light');

	const StyledMortgageCalculator = styled.div`
		min-height: 3em;
		border-radius: .4em;
		padding: 1.6em;
		background: ${theme[activeTheme].background};
	`;

	function getDownpaymentPercentageFromInitialValues(
			property_value: number, 
			downpayment_amount: number, 
			downpayment_percentage_min: number, 
			downpayment_percentage_max: number
		) {

		const calculatedPercentage = (downpayment_amount * 100) / property_value;

		if (
				calculatedPercentage < downpayment_percentage_min || 
				calculatedPercentage > downpayment_percentage_max
			) {
			// Percentage value defaults to minimum
			// if there's an error in calculation.
			return downpayment_percentage_min
		} else {
			return calculatedPercentage
		}
	}

	const initialFormValues: FormValues = {
		property_value: 1200000,
		downpayment_amount: 240000,
		downpayment_percentage: -1,     // ..to avoid TS error as it expects a number.
		downpayment_percentage_min: -1, // ..to avoid TS error as it expects a number.
		downpayment_percentage_max: 80, 
		loan_term_in_months: 300,
		interest_rate_per_year: 2.49
	}

	// get the correct values here.
	initialFormValues.downpayment_percentage_min = 
		initialFormValues.property_value >= 5000000 ? 30 : 20;

	initialFormValues.downpayment_percentage = 
		getDownpaymentPercentageFromInitialValues(
			initialFormValues.property_value, 
			initialFormValues.downpayment_amount,
			initialFormValues.downpayment_percentage_min,
			initialFormValues.downpayment_percentage_max
		);

	return <StyledMortgageCalculator>
		<PaymentDetails initialFormValues={initialFormValues} activeTheme={activeTheme} />
	</StyledMortgageCalculator>
};

export default MortgageCalculator;
