import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { FormValues, FormFields } from '../types';
import Slider from 'react-input-slider';
import NumberFormat, { NumberFormatValues } from 'react-number-format';

const StyledPaymentDetails = styled.div`
	width: 100%;

	h1 {
		font-size: 2em;
		text-align: center;
		margin: .5em 0 1em;
		padding: 0 0 .5em;
		border-bottom: .05em solid ${props => props.theme.secondaryColor[1]};
	}

	h2 {
		font-size: 1.8em;
		margin: 0;
	}

	.input-container {
		position: relative;
		margin: 1em 0 2.4em;

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
		margin: 1em 0 1em;

		.text-size {
			font-size: 1.6em;
		}
	}

	.down-payment-slider {
		margin: 0 0 2.4em 0;
	}

	.loan-term {
		display: flex;
		justify-content: space-between;
		margin: 1em 0 2.4em;
		padding: 0 4em;

		div {
			position: relative;
			display: inline-block;
			width: 4em;
			height: 4em;
			border-radius: 2.5em;
			background: ${props => props.theme.secondaryColor[1]};
			color: ${props => props.theme.textColor[1]};
			cursor: pointer;

			span {
				position: absolute;
				top: 50%; left: 50%;
				transform: translate(-50%, -50%);
				font-size: 1.8em;
			}
	
			&.active {
				background: ${props => props.theme.primaryColor[0]};
			}
		}
	}

	.interest-error {
		width: 100%;
		text-align: center;

		position: absolute;
		top: 4.6em; left: 50%;
		transform: translateX(-50%);

		color: ${props => props.theme.textColor[1]};
		background: ${props => props.theme.primaryColor[0]};
		padding: .5em 1em;
		border-radius: 5em;

		span {
			font-size: 1.4em;
		}
	}
`;

type PaymentDetailProps = {
	formValues: FormValues;
	handleFormValueChange: (field: FormFields, value: number) => void;
}

export default function PaymentDetails(props: PaymentDetailProps) {
	const themeContext = useContext(ThemeContext);

	function checkActiveLoanBtn(loan: number) {
		return props.formValues.loanTermInMonths / 12 === loan ? 'active' : '';
	}

	return (
		<StyledPaymentDetails>
			<h1>Mortgage Calculator</h1>
			<h2>Property Value</h2>
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

			<h2>Down Payment Amount:</h2>
			<div className={'down-payment-info'}>
				<div>
					<span className={'text-size'}>
						<NumberFormat 
							value={props.formValues.downPaymentAmount} 
							displayType={'text'} 
							thousandSeparator={true} 
							decimalScale={1}
						/>
						<span>{' AED'}</span>
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
							height: '.3em',
							background: themeContext.secondaryColor[0]
						},
						active: {
							background: themeContext.primaryColor[0]
						},
						thumb: {
							width: '2em',
							height: '2em',
							backgroundColor: themeContext.primaryColor[0]
						}
					}}
				/>
			</div>

			<h2>Loan Term</h2>
			<div className={'loan-term'}>
				<div 
					onClick={(e) => { props.handleFormValueChange('loanTerm', 5) }}
					className={checkActiveLoanBtn(5)}
				>
					<span>5</span>
				</div>
				<div 
					onClick={(e) => { props.handleFormValueChange('loanTerm', 10) }}
					className={checkActiveLoanBtn(10)}
				>
					<span>10</span>
				</div>
				<div 
					onClick={(e) => { props.handleFormValueChange('loanTerm', 15) }}
					className={checkActiveLoanBtn(15)}
				>
					<span>15</span>
				</div>
				<div 
					onClick={(e) => { props.handleFormValueChange('loanTerm', 20) }}
					className={checkActiveLoanBtn(20)}
				>
					<span>20</span>
				</div>
				<div 
					onClick={(e) => { props.handleFormValueChange('loanTerm', 25) }}
					className={checkActiveLoanBtn(25)}
				>
					<span>25</span>
				</div>
			</div>
			
			<h2>Interest Rate</h2>
			<div className={'input-container'}>
				{
					props.formValues.interestRateErrorMessage ? 
						<div className={'interest-error'}>
							<span>Interest rate must be between 1.00 and 9.55</span>
						</div> : null
				}
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
