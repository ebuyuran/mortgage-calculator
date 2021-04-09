import styled from 'styled-components';
import { FormValues, FormFields } from '../types';
import Slider from 'react-input-slider';
import NumberFormat, { NumberFormatValues } from 'react-number-format';

const StyledPaymentDetails = styled.div`
	width: 100%;

	.styledbuttons {
		display: inline-block;
		padding: 5px 10px;
		font-size: 1.5em;
		background: tomato;
		color: white;
		margin-right: 10px;
		cursor: pointer;

		&.active {
			background: black;
		}
	}
`;

type PaymentDetailProps = {
	formValues: FormValues;
	handleFormValueChange: (field: FormFields, value: number) => void;
}

export default function PaymentDetails(props: PaymentDetailProps) {
	function checkActiveLoanBtn(loan: number) {
		return props.formValues.loanTermInMonths / 12 === loan ? 'active' : '';
	}

	return (
		<StyledPaymentDetails>
			<h2>Property Value</h2>
			<NumberFormat 
				value={props.formValues.propertyValue} 
				allowNegative={false}
				thousandSeparator={true} 
				onValueChange={(values: NumberFormatValues) => {
					props.handleFormValueChange('propertyValue', Number(values.value));
				}}
			/>
			<NumberFormat 
				value={props.formValues.propertyValue} 
				displayType={'text'}
				allowNegative={false}
				thousandSeparator={true} 
				decimalScale={2}
			/>
			<div style={{ marginTop: 20, fontSize: 15 }}>
				{`down_payment Amount: `}
				<NumberFormat 
					value={props.formValues.downPaymentAmount} 
					displayType={'text'} 
					thousandSeparator={true} 
					decimalScale={1}
				/>
			</div>
			<div style={{ marginTop: 20, fontSize: 15 }}>
				{`down_payment Percentage: ${props.formValues.downPaymentPercentage}%`}
			</div>
			<div style={{ marginTop: 20 }}>
				<Slider 
					xmin={props.formValues.minimumDownPaymentPercentage} 
					xmax={props.formValues.maximumDownPaymentPercentage}
					x={props.formValues.downPaymentPercentage}
					onChange={(e) => {
						props.handleFormValueChange('downPaymentPercentage', e.x);
					}}
				/>
			</div>
			<div>
				<h2>Loan Term</h2>
				<div onClick={(e) => { props.handleFormValueChange('loanTerm', 5) }} className={`styledbuttons ${checkActiveLoanBtn(5)}`}>5</div>
				<div onClick={(e) => { props.handleFormValueChange('loanTerm', 10) }} className={`styledbuttons ${checkActiveLoanBtn(10)}`}>10</div>
				<div onClick={(e) => { props.handleFormValueChange('loanTerm', 15) }} className={`styledbuttons ${checkActiveLoanBtn(15)}`}>15</div>
				<div onClick={(e) => { props.handleFormValueChange('loanTerm', 20) }} className={`styledbuttons ${checkActiveLoanBtn(20)}`}>20</div>
				<div onClick={(e) => { props.handleFormValueChange('loanTerm', 25) }} className={`styledbuttons ${checkActiveLoanBtn(25)}`}>25</div>
			</div>
			<div>
				<h2>Interest Rate</h2>
				{props.formValues.interestRateErrorMessage ? <div>Must be between 1.00 and 9.55</div> : null}
				<NumberFormat 
					value={props.formValues.interestRatePerYear} 
					thousandSeparator={true} 
					allowNegative={false}
					decimalScale={2}
					fixedDecimalScale={true}
					onValueChange={(values) => {
						props.handleFormValueChange('interestRate', Number(values.value));
					}}
				/>
			</div>
		</StyledPaymentDetails>
	)
};
