import { ThemeInterface } from './types';

export const themes: ThemeInterface = {
	light: {
		background: 'white',
		textColor: ['black', 'white'],
		primaryColor: ['tomato', '#c48c82'],
		secondaryColor: ['#ddd', 'silver']
	},

	dark: {
		background: 'black',
		textColor: ['white', 'black'],
		primaryColor: ['darkslategray', '#c48c82'],
		secondaryColor: ['#ddd', 'silver']
	}
};
