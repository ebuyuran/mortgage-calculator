export type ThemeTypes = 'light' | 'dark';

export type ThemeInterface = {
	[x in ThemeTypes]: {
		background: string;
	};
};

export interface FormValues {
	/* 
		The line below is needed to update state
		values with conditional property names.
	*/ 
	[x: string]: number;
	property_value: number;
	downpayment_amount: number;
	downpayment_percentage: number;
	downpayment_percentage_min: number;
	downpayment_percentage_max: number;
	loan_term_in_months: number;
	interest_rate_per_year: number;
};
