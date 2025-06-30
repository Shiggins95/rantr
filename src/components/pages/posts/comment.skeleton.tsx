import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { darkColours } from '@/themes/themes';
import { View } from 'tamagui';

export function CommentSkeleton({ depth = 0 }) {
	return (
		<View
			bg="$background"
			paddingLeft="$md"
			pt="$md"
			pb="$xs"
			alignItems="center"
			my="$xs"
			mb={depth > 0 ? 0 : '$xs'}
			jc="space-between"
			position="relative"
			borderBottomWidth={depth > 0 ? 2 : 0}
			borderLeftWidth={depth > 0 ? 2 : 0}
			borderColor="$primary20"
		>
			<View style={{ flex: 1, flexGrow: 1, width: '100%' }}>
				<SkeletonPlaceholder
					borderRadius={4}
					backgroundColor={darkColours.color.primary40.val}
					highlightColor={darkColours.color.primary50.val}
				>
					<>
						{/* Header */}
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginBottom: 12,
							}}
						>
							{/* Profile circle */}
							<View style={{ width: 32, height: 32, borderRadius: 16 }} />

							{/* Username & timestamp */}
							<View style={{ marginLeft: 12, flex: 1 }}>
								<View
									style={{
										width: 120,
										height: 12,
										borderRadius: 4,
										marginBottom: 6,
									}}
								/>
								<View style={{ width: 40, height: 10, borderRadius: 4 }} />
							</View>

							{/* Three-dot placeholder */}
							<View
								style={{
									width: 14,
									height: 14,
									borderRadius: 7,
									marginLeft: 8,
								}}
							/>
						</View>

						{/* Comment body lines */}
						<View
							style={{
								width: '100%',
								height: 12,
								borderRadius: 4,
								marginBottom: 6,
							}}
						/>
						<View style={{ width: '85%', height: 12, borderRadius: 4 }} />
					</>
				</SkeletonPlaceholder>
			</View>
		</View>
	);
}
