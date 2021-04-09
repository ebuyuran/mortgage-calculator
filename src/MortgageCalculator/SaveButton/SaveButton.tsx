import { FormValues } from '../types';
import { useCookies } from 'react-cookie';

export default function SaveButton(props: {formValues: FormValues}) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [cookies, setCookie] = useCookies(['mortgage-calculator']);

	return (
		<div
			onClick={() => {
				setCookie('mortgage-calculator', props.formValues, { path: '/' });
			}} 
			style={{background: 'tomato', padding: 30, display: 'inline-block', marginTop: 30, color: 'white'}}
		>SAVE</div>
	)
};
