import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { FormValues } from '../types';

type MonthlyPaymentProps = {
	formValues: FormValues;
};

const StyledMonthlyPayment = styled.div`
	.container {
		color: ${props => props.theme.textColor[0]};

		.payment-amount-wrapper {
			position: relative;
			top: -.4em;

			.payment-amount {
				font-size: 3em;
				font-weight: bold;
			}
	
			.currency {
				position: relative;
				bottom: 1em; left: .25em;
				font-size: 1.2em;
			}
	
			.payment-periods {
				font-size: 1.2em;
			}
		}
	}
`;

function calculatePaymentBasedOnLoanAmount(loanAmount: number, loanTerm: number, interestRate: number): number {
	const interestRatePerMonth = interestRate / 100 / 12;
	let totalPayments = loanTerm;
	let monthlyPayment = loanAmount / (totalPayments - 1);

	if (interestRatePerMonth > 0) {
		totalPayments = Math.pow(1 + interestRatePerMonth, loanTerm);
		monthlyPayment =
			loanAmount *
			((interestRatePerMonth * totalPayments) / (totalPayments - 1));
	}

	return monthlyPayment;
}

export default function MonthlyPayment(props: MonthlyPaymentProps) {
	if (props.formValues.interestRateErrorMessage) {
		return null
	} else {
		return (
			<StyledMonthlyPayment>
				<div className={'container'}>
					<div className={'payment-amount-wrapper'}>
						<span className={'payment-amount'}>
							<NumberFormat
								value={calculatePaymentBasedOnLoanAmount(
									props.formValues.propertyValue,
									props.formValues.loanTermInMonths,
									props.formValues.interestRatePerYear,
								)} 
								displayType={'text'}
								allowNegative={false}
								thousandSeparator={true} 
								decimalScale={0}
								
							/>
						</span>
						<span className={'currency'}>AED</span>
						<div className={'payment-periods'}>per month</div>
					</div>
				</div>
			</StyledMonthlyPayment>
		)
	}
};
