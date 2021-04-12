export type ThemeTypes = 'light' | 'dark';

type Colors = 'black' | 'white' | 'tomato' | '#fa740a' | '#484747' |
	'#ddd' | '#c48c82' | 'silver' | '#bb0000'| '#1c1c1e' | '#252527';

export type ThemeInterface = {
	[x in ThemeTypes]: {
		background: Colors;
		textColor: Colors[];
		primaryColor: Colors[];
		secondaryColor: Colors[];
		errorColor: Colors;
		inputBackgroundColor: Colors;
		inputBorderColor: Colors;
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
