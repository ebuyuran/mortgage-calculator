import { Component } from 'react';
import styled from 'styled-components';
import { ThemeTypes, FormValues, FormFields } from '../types';
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
	}
`;

type PaymentDetailProps = {
	activeTheme: ThemeTypes;
	formValues: FormValues;
	handleFormValueChange: (field: FormFields, value: number) => void;
}

class PaymentDetails extends Component<PaymentDetailProps> {
	render() {
		return <StyledPaymentDetails>
			<h2>Property Value</h2>
			<NumberFormat 
				value={this.props.formValues.propertyValue} 
				allowNegative={false}
				thousandSeparator={true} 
				onValueChange={(values: NumberFormatValues) => {
					this.props.handleFormValueChange('propertyValue', Number(values.value));
				}}
			/>
			<NumberFormat 
				value={this.props.formValues.propertyValue} 
				allowNegative={false}
				thousandSeparator={true} 
				displayType={'text'}
			/>
			<div style={{ marginTop: 20, fontSize: 15 }}>
				{`down_payment Amount: `}
				<NumberFormat 
					value={this.props.formValues.downPaymentAmount} 
					displayType={'text'} 
					thousandSeparator={true} 
					decimalScale={1}
				/>
			</div>
			<div style={{ marginTop: 20, fontSize: 15 }}>
				{`down_payment Percentage: ${this.props.formValues.downPaymentPercentage}%`}
			</div>
			<div style={{ marginTop: 20 }}>
				<Slider 
					xmin={this.props.formValues.minimumDownPaymentPercentage} 
					xmax={this.props.formValues.maximumDownPaymentPercentage}
					x={this.props.formValues.downPaymentPercentage}
					onChange={(e) => {
						this.props.handleFormValueChange('downPaymentPercentage', e.x);
					}}
				/>
			</div>
			<div>
				<h2>Loan Term</h2>
				<div onClick={(e) => { this.props.handleFormValueChange('loanTerm', 5) }} className={'styledbuttons'}>5</div>
				<div onClick={(e) => { this.props.handleFormValueChange('loanTerm', 10) }} className={'styledbuttons'}>10</div>
				<div onClick={(e) => { this.props.handleFormValueChange('loanTerm', 15) }} className={'styledbuttons'}>15</div>
				<div onClick={(e) => { this.props.handleFormValueChange('loanTerm', 20) }} className={'styledbuttons'}>20</div>
				<div onClick={(e) => { this.props.handleFormValueChange('loanTerm', 25) }} className={'styledbuttons'}>25</div>
			</div>
			<div>
				<h2>Interest Rate</h2>
				{this.props.formValues.interestRateErrorMessage ? <div>Must be between 1.00 and 9.55</div> : null}
				<NumberFormat 
					value={this.props.formValues.interestRatePerYear} 
					thousandSeparator={true} 
					allowNegative={false}
					decimalScale={2}
					fixedDecimalScale={true}
					onValueChange={(values) => {
						this.props.handleFormValueChange('interestRate', Number(values.value));
					}}
				/>
			</div>
		</StyledPaymentDetails>
	}
};

export default PaymentDetails;