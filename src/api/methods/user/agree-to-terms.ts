import { SupabaseClient } from '@supabase/supabase-js';

export const agreeToTerms = async (
	userId: string,
	supabase: SupabaseClient,
) => {
	const { data: existingAgreement } = await supabase
		.from('terms')
		.select()
		.eq('user_id', userId)
		.maybeSingle();

	console.log('existingResponse', existingAgreement);

	if (existingAgreement) {
		const { data, error } = await supabase
			.from('terms')
			.update({ timestamp: new Date() })
			.eq('user_id', userId)
			.select()
			.single();
		if (error) throw error;
		return data.id;
	}

	const { data, error } = await supabase
		.from('terms')
		.insert({ user_id: userId, timestamp: new Date() })
		.select()
		.single();
	if (error) throw error;
	return data.id as string;
};
