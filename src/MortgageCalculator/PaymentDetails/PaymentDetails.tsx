import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { StyledPaymentDetails } from './StyledPaymentDetails';
import { FormValues, FormFields } from '../../types';
import Slider from 'react-input-slider';
import NumberFormat, { NumberFormatValues } from 'react-number-format';

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
					isAllowed={(inputObj: NumberFormatValues) => {
						return Number(inputObj.value) < 100000000;
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
							decimalScale={0}
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
							<span>Interest rate must be between 1.00% and 9.55%</span>
						</div> : null
				}
				<NumberFormat 
					value={props.formValues.interestRatePerYear} 
					thousandSeparator={true} 
					allowNegative={false}
					decimalScale={2}
					fixedDecimalScale={true}
					suffix={'%'}
					onValueChange={(values) => {
						props.handleFormValueChange('interestRate', Number(values.value));
					}}
				/>
			</div>
		</StyledPaymentDetails>
	)
};
