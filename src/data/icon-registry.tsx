'use client';

import { FiCode, FiCpu, FiLayers, FiPackage, FiPrinter, FiZap } from 'react-icons/fi';
import {
  RocketIcon,
  ZapIcon,
  SparklesIcon,
  SettingsIcon,
  UsersIcon,
  BookIcon,
  ShieldIcon,
} from '@/components/ui/Icons';

export const contentIcons = {
  FiCode,
  FiCpu,
  FiLayers,
  FiPackage,
  FiPrinter,
  FiZap,
  RocketIcon,
  ZapIcon,
  SparklesIcon,
  SettingsIcon,
  UsersIcon,
  BookIcon,
  ShieldIcon,
} as const;

export type ContentIconName = keyof typeof contentIcons;

export function getContentIcon(name: string) {
  const Icon = contentIcons[name as ContentIconName];
  if (!Icon) {
    console.warn(`[site-content] unknown icon "${name}", using RocketIcon`);
    return RocketIcon;
  }
  return Icon;
}
