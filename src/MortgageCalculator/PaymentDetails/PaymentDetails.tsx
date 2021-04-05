import { Component } from 'react';
import styled from 'styled-components';
import { ThemeTypes, FormValues } from '../types';
import Slider from 'react-input-slider';

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
			property_value: initial.property_value,
			downpayment_amount: initial.downpayment_amount,
			downpayment_percentage: initial.downpayment_percentage,
			downpayment_percentage_min: initial.downpayment_percentage_min,
			downpayment_percentage_max: initial.downpayment_percentage_max,
			loan_term_in_months: initial.loan_term_in_months,
			interest_rate_per_year: initial.interest_rate_per_year
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(e: React.FormEvent) {
    const target = (e.target as HTMLInputElement);

		if (target) {
			const value = Number(target.value);
			const name = target.name;
	
			this.setState({
				[name]: value
			});
		}
		return
  }

	render() {
		return <StyledPaymentDetails>
			<h2>Property Value</h2>
			<input 
				type={'number'}
				name={'property_value'}
				value={this.state.property_value}
				onChange={this.handleInputChange}
			/>
			{this.state.property_value}
			<div style={{ marginTop: 20, fontSize: 15 }}>
				{`Downpayment Amount: ${this.state.downpayment_amount}`}
			</div>
			<div style={{ marginTop: 20, fontSize: 15 }}>
				{`Downpayment Percentage: ${this.state.downpayment_percentage}`}
			</div>
			<div style={{ marginTop: 20 }}>
				<Slider 
					xmin={this.state.downpayment_percentage_min} 
					xmax={this.state.downpayment_percentage_max}
					x={this.state.downpayment_percentage}
					onChange={(e) => {
						const updated_downpayment_amount = 
							Math.round(this.state.property_value * (this.state.downpayment_percentage / 100))
						this.setState({
							downpayment_percentage: e.x,
							downpayment_amount: updated_downpayment_amount
						});
					}}
				/>
			</div>
		</StyledPaymentDetails>
	}
};

export default PaymentDetails;
