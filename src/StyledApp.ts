import styled from 'styled-components';

export const StyledApp = styled.div`
width: 36em;
border-radius: .8em;

.theme-switcher {
	float: right;
	position: relative;
	top: -3em;
	right: .5em;

	.background {
		position: relative;
		width: 4em;
		height: 2.4em;
		border-radius: 3em;
		background: white;
		cursor: pointer;

		.handle {
			position: absolute;
			top: .3em; left: .3em;
			width: 1.8em;
			height: 1.8em;
			border-radius: 2em;
			background: tomato;
		}

		.text {
			position: absolute;
			top: .3em; left: -7em;
			color: black;
			user-select: none;

			span {
				font-size: 1.2em;
			}
		}
	}

	&.dark {
		.background {      
			background: black;

			.handle {
				background: white;
				left: 1.9em;
			}
		}
	}
}
`; 