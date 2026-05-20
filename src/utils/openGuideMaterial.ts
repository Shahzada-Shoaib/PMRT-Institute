import { Linking } from 'react-native';

import type { CourseContentItem } from '@/types/course';

export async function openGuideMaterial(item: CourseContentItem) {
  if (item.type !== 'material' || !item.materialUrl) {
    return;
  }

  const canOpen = await Linking.canOpenURL(item.materialUrl);
  if (!canOpen) {
    return;
  }

  await Linking.openURL(item.materialUrl);
}
