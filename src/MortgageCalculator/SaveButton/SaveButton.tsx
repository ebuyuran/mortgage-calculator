import styled from 'styled-components';
import { FormValues } from '../../types';
import { useCookies } from 'react-cookie';

export default function SaveButton(props: {formValues: FormValues}) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [cookies, setCookie] = useCookies(['mortgage-calculator']);

	const StyledSaveButton = styled.div`
		position: relative;
		width: 12em;
		height: 5em;
		background: ${props => props.theme.primaryColor[0]};
		color: ${props => props.theme.textColor[1]};
		cursor: pointer;
		user-select: none;

		span {
			position: absolute;
			top: 50%; left: 50%;
			transform: translate(-50%, -50%);
			font-size: 1.4em;
		}
	`;

	if (props.formValues.interestRateErrorMessage) {
		return null;
	} else {
		return (
			<StyledSaveButton
				onClick={() => {
					setCookie('mortgage-calculator', props.formValues, { path: '/' });
				}}
			>
				<span>SAVE</span>
			</StyledSaveButton>
		);
	}
};
