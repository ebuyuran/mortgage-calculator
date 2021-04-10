import styled from 'styled-components';
import { FormValues, FormFields } from '../types';
import Slider from 'react-input-slider';
import NumberFormat, { NumberFormatValues } from 'react-number-format';

const StyledPaymentDetails = styled.div`
	width: 100%;

	h1 {
		font-size: 1.8em;
		margin: .5 0 1.5em;
	}

	.input-container {
		position: relative;

		.currency {
			position: absolute;
			top: 50%; transform: translateY(-50%);
			right: 1em;
			font-size: 1.6em;
			pointer-events: none;
		}

		input {
			font-size: 1.6em;
			width: 100%;
			height: 100%;
			background: none;
			padding: .7em 4em .7em .6em;
			border: .1em solid black;
		}
	}

	.down-payment-info {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 2em 0;

		.down-payment-percentage {
			text-align: right;
		}

		.text-size {
			font-size: 1.6em;
		}
	}

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
			<h1>Property Value</h1>
			<div className={'input-container'}>
				<NumberFormat 
					value={props.formValues.propertyValue} 
					allowNegative={false}
					thousandSeparator={true}
					decimalScale={0}
					onValueChange={(values: NumberFormatValues) => {
						props.handleFormValueChange('propertyValue', Number(values.value));
					}}
				/>
				<div className={'currency'}>AED</div>
			</div>

			<div className={'down-payment-info'}>
				<div>
					<span className={'text-size'}>
						<div>Down Payment Amount:</div>
						<div>
							<NumberFormat 
								value={props.formValues.downPaymentAmount} 
								displayType={'text'} 
								thousandSeparator={true} 
								decimalScale={1}
							/>
						</div>
					</span>
				</div>
				<div className={'down-payment-percentage'}>
					<span className={'text-size'}>{`${props.formValues.downPaymentPercentage}%`}</span>
					</div>
			</div>

			<div className={'down-payment-slider'}>
				<Slider 
					xmin={props.formValues.minimumDownPaymentPercentage} 
					xmax={props.formValues.maximumDownPaymentPercentage}
					x={props.formValues.downPaymentPercentage}
					onChange={(e) => {
						props.handleFormValueChange('downPaymentPercentage', e.x);
					}}
					styles={{
						track: {
							width: '100%',
							height: '.3em'
						},
						active: {
						},
						thumb: {
							width: '2em',
							height: '2em',
							backgroundColor: 'green'
						}
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
