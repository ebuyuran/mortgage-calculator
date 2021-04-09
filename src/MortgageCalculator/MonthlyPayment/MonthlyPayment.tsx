import { FormValues, ThemeTypes } from '../types';
import NumberFormat from 'react-number-format';

type MonthlyPaymentProps = {
	activeTheme: ThemeTypes;
	formValues: FormValues;
};

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
		return <span>Error</span>
	} else {
		return <div style={{ marginTop: 50, fontSize: 30}}>
			{'monthly loan: '}
			<NumberFormat
				value={calculatePaymentBasedOnLoanAmount(
					props.formValues.propertyValue,
					props.formValues.loanTermInMonths,
					props.formValues.interestRatePerYear,
				)} 
				displayType={'text'}
				allowNegative={false}
				thousandSeparator={true} 
				decimalScale={2}
			/>
		</div>
	}
};
