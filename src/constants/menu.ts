import type { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

import { gradients } from '@/constants/theme';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

export type MenuItem = {
  id: string;
  title: string;
  icon: IoniconName;
  route:
    | '/(main)/courses'
    | '/(main)/free-videos'
    | '/(main)/diagram'
    | '/(main)/pay-fee'
    | '/(main)/chat-us'
    | '/(main)/about-us';
  gradient: readonly [string, string];
};

export const menuItems: MenuItem[] = [
  {
    id: 'all-courses',
    title: 'All Courses',
    icon: 'library-outline',
    route: '/(main)/courses',
    gradient: gradients.primaryButton,
  },
  {
    id: 'free-videos',
    title: 'Free Videos',
    icon: 'play-circle-outline',
    route: '/(main)/free-videos',
    gradient: gradients.menuSky,
  },
  {
    id: 'diagram',
    title: 'Diagram',
    icon: 'git-network-outline',
    route: '/(main)/diagram',
    gradient: gradients.menuTeal,
  },
  {
    id: 'pay-fee',
    title: 'Pay Fee',
    icon: 'card-outline',
    route: '/(main)/pay-fee',
    gradient: gradients.secondaryButton,
  },
  {
    id: 'chat-us',
    title: 'Chat Us',
    icon: 'chatbubbles-outline',
    route: '/(main)/chat-us',
    gradient: gradients.menuDeep,
  },
  {
    id: 'about-us',
    title: 'About Us',
    icon: 'information-circle-outline',
    route: '/(main)/about-us',
    gradient: gradients.menuBrand,
  },
];
