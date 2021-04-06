export type ThemeTypes = 'light' | 'dark';

type Colors = 'black' | 'white';

export type ThemeInterface = {
	[x in ThemeTypes]: {
		background: Colors;
	};
};

export interface FormValues {
	propertyValue: number;
	downPaymentAmount: number;
	downPaymentPercentage: number;
	downPaymentPercentageMin: number;
	downPaymentPercentageMax: number;
	loanTermInMonths: number;
	interestRatePerYear: number;
};
