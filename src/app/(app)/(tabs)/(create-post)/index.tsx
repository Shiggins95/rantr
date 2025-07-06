import { Page } from '@/src/components/page';
import { useNavbarContext } from '@/src/context/navbar-context';
import { Headline } from '@ui/healine';
import { useFocusEffect } from 'expo-router';

export default function () {
	const { setShow } = useNavbarContext();

	useFocusEffect(() => {
		setShow(false);
		return () => setShow(true);
	});

	return (
		<Page>
			<Headline>Create post</Headline>
		</Page>
	);
}
