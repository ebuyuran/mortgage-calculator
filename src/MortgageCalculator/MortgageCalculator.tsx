import { useState } from 'react';
import styled from 'styled-components';
import PaymentDetails from './PaymentDetails/PaymentDetails';
import MonthlyPayment from './MonthlyPayment/MonthlyPayment';
import SaveButton from './SaveButton/SaveButton';
import { 
	getMinimumDownPaymentPercentage, 
	downPaymentPercentageLimit,
	minimumDownPaymentPercentageHigh
} from '../helpers';
import { FormValues, FormFields } from '../types';

type MortgageCalculatorProps = {
	initialValues: FormValues;
}

const StyledMortgageCalculator = styled.div`
	border-radius: .8em;

	padding: 2em;
	background: ${props => props.theme.background};

	.footer-container {
		display: flex;
		justify-content: space-between;
		margin: 2em 0 1em;
	}
`;

export default function MortgageCalculator(props: MortgageCalculatorProps) {
	const [formValues, setFormValues] = useState<FormValues>(props.initialValues);

	function handleFormValueChange(field: FormFields, newValue: number) {
		const current = formValues;
		const updated = {...current};

		switch (field) {
			case 'propertyValue':
				updated.propertyValue = newValue;

				const updatedMinimumDownPaymentPercentage = 
					getMinimumDownPaymentPercentage(updated.propertyValue);

				if (updatedMinimumDownPaymentPercentage === current.minimumDownPaymentPercentage) {
					// Calculate new down payment amount.
					updated.downPaymentAmount = 
						updated.propertyValue * (current.downPaymentPercentage / 100);
				} else {
					updated.minimumDownPaymentPercentage = updatedMinimumDownPaymentPercentage;
					// Reset down payment percentage to minimum if
					// it's not allowed by new minimum limit.
					if (
						// When new propert value is over down payment percentage limit,
						updated.propertyValue >= downPaymentPercentageLimit &&
						current.downPaymentPercentage < minimumDownPaymentPercentageHigh
					) {
						// set the new minimum percentage to updated minimum limit.
						updated.downPaymentPercentage = updated.minimumDownPaymentPercentage;
						// calculate down payment amount accordingly,
						updated.downPaymentAmount = 
							updated.propertyValue * (updated.minimumDownPaymentPercentage / 100);
					} else {
						// or calculate with old percentage value.
						updated.downPaymentAmount = 
							updated.propertyValue * (current.downPaymentPercentage / 100);
					}
				}
				break;

			case 'downPaymentPercentage':
				if (current.downPaymentPercentage !== newValue) {
					updated.downPaymentAmount = 
						Math.round(current.propertyValue * (newValue / 100));
	
					updated.downPaymentPercentage = newValue;
				}
				break;

			case 'loanTerm':
				updated.loanTermInMonths = newValue * 12;
				break;

			case 'interestRate':
				updated.interestRatePerYear = newValue;
				updated.interestRateErrorMessage = (newValue < 1.00 || newValue > 9.55);
				break;
		}
		
		setFormValues(updated);
	}

	return (
		<StyledMortgageCalculator>
			<PaymentDetails 
				formValues={formValues}
				handleFormValueChange={handleFormValueChange}
			/>
			<div className={'footer-container'}>
				<MonthlyPayment 
					formValues={formValues}
				/>
				<SaveButton
					formValues={formValues}
				/>
			</div>

		</StyledMortgageCalculator>
	)
};
