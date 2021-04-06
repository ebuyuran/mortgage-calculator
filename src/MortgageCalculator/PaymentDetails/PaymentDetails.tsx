import { Component } from 'react';
import styled from 'styled-components';
import { ThemeTypes, FormValues } from '../types';
import Slider from 'react-input-slider';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { getMinimumDownPaymentPercentage } from '../helpers';

const StyledPaymentDetails = styled.div`
	width: 100%;
`;

type PaymentDetailProps = {
	activeTheme: ThemeTypes;
	initialFormValues: FormValues;
}

type PaymentDetailState = FormValues;

class PaymentDetails extends Component<PaymentDetailProps, PaymentDetailState> {
	constructor(props: PaymentDetailProps) {
		super(props);
		const initial = this.props.initialFormValues;

		this.state = {
			propertyValue: initial.propertyValue,
			downPaymentAmount: initial.downPaymentAmount,
			downPaymentPercentage: initial.downPaymentPercentage,
			downPaymentPercentageMin: initial.downPaymentPercentageMin,
			downPaymentPercentageMax: initial.downPaymentPercentageMax,
			loanTermInMonths: initial.loanTermInMonths,
			interestRatePerYear: initial.interestRatePerYear
		};

		this.handlePropertyValueChange = this.handlePropertyValueChange.bind(this);
		this.handleDownPaymentAmountChange = this.handleDownPaymentAmountChange.bind(this);
	}

	handlePropertyValueChange(values: NumberFormatValues) {
		const newPropertyValue = Number(values.value);
		const minimumDownPaymentPercentage = 
			getMinimumDownPaymentPercentage(newPropertyValue);

		if (this.state.downPaymentPercentageMin === minimumDownPaymentPercentage) {
			this.setState({
				propertyValue: newPropertyValue,
				downPaymentAmount: newPropertyValue * (this.state.downPaymentPercentage / 100)
			});
		} else {
			// Reset Down Payment Percentage to minimum when minimum percentage changes.
			this.setState({
				propertyValue: newPropertyValue,
				downPaymentPercentageMin: minimumDownPaymentPercentage,
				downPaymentPercentage: minimumDownPaymentPercentage,
				downPaymentAmount: newPropertyValue * (minimumDownPaymentPercentage / 100)
			});
		}
  }

	handleDownPaymentAmountChange(e: {x: number}) {
		const updatedDownPaymentAmount = 
		Math.round(this.state.propertyValue * (this.state.downPaymentPercentage / 100))
		this.setState({
			downPaymentPercentage: e.x,
			downPaymentAmount: updatedDownPaymentAmount
		});
	}

	render() {
		return <StyledPaymentDetails>
			<h2>Property Value</h2>
			<NumberFormat 
				value={this.state.propertyValue} 
				thousandSeparator={true} 
				onValueChange={this.handlePropertyValueChange}
			/>
			<div style={{ marginTop: 20, fontSize: 15 }}>
				{`down_payment Amount: `}
				<NumberFormat value={this.state.downPaymentAmount} displayType={'text'} thousandSeparator={true} />
			</div>
			<div style={{ marginTop: 20, fontSize: 15 }}>
				{`down_payment Percentage: ${this.state.downPaymentPercentage}%`}
			</div>
			<div style={{ marginTop: 20 }}>
				<Slider 
					xmin={this.state.downPaymentPercentageMin} 
					xmax={this.state.downPaymentPercentageMax}
					x={this.state.downPaymentPercentage}
					onChange={this.handleDownPaymentAmountChange}
				/>
			</div>
		</StyledPaymentDetails>
	}
};

export default PaymentDetails;
