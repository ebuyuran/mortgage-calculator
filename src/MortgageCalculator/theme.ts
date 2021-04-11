import { ThemeInterface } from './types';

export const themes: ThemeInterface = {
	light: {
		background: 'white',
		textColor: ['black', 'white'],
		primaryColor: ['tomato'],
		secondaryColor: ['#ddd', 'silver'],
		errorColor: '#bb0000',
		inputBackgroundColor: 'white',
		inputBorderColor: 'black',
	},
	dark: {
		background: 'black',
		textColor: ['#ddd', 'white'],
		primaryColor: ['#fa740a'],
		secondaryColor: ['#ddd', '#1c1c1e'],
		errorColor: '#bb0000',
		inputBackgroundColor: '#1c1c1e',
		inputBorderColor: '#252527'
	}
};
