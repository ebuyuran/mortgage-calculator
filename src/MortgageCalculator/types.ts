export type ThemeTypes = 'light' | 'dark';

type Colors = 'black' | 'white';

export type ThemeInterface = {
	[x in ThemeTypes]: {
		background: Colors;
		textColor: Colors;
	};
};

export type FormFields = 'propertyValue' | 'downPaymentPercentage' | 'loanTerm' | 'interestRate';

export interface FormValues {
	propertyValue: number;
	downPaymentAmount: number;
	downPaymentPercentage: number;
	minimumDownPaymentPercentage: number;
	maximumDownPaymentPercentage: number;
	loanTermInMonths: number;
	interestRatePerYear: number;
	interestRateErrorMessage?: boolean;
};
