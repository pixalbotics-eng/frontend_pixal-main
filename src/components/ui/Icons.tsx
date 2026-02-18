'use client';

import React from 'react';
import {
  FiZap,
  FiUsers,
  FiBook,
  FiShield,
  FiSettings,
  FiHome,
  FiMenu,
  FiX,
  FiChevronRight,
  FiMail,
  FiPhone,
  FiClock,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiStar,
  FiTrendingUp,
  FiActivity,
} from 'react-icons/fi';
import {
  FaWhatsapp,
} from 'react-icons/fa';
import {
  HiOutlineSparkles,
  HiOutlineRocketLaunch,
} from 'react-icons/hi2';
import {
  AiOutlineRocket,
} from 'react-icons/ai';

interface IconProps {
  className?: string;
  size?: number | string;
}

// Service Icons
export const RocketIcon = ({ className = '', size = 24 }: IconProps) => (
  <AiOutlineRocket className={className} size={size} />
);

export const ZapIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiZap className={className} size={size} />
);

export const UsersIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiUsers className={className} size={size} />
);

export const BookIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiBook className={className} size={size} />
);

export const ShieldIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiShield className={className} size={size} />
);

export const SettingsIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiSettings className={className} size={size} />
);

export const SparklesIcon = ({ className = '', size = 24 }: IconProps) => (
  <HiOutlineSparkles className={className} size={size} />
);

export const TrendingUpIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiTrendingUp className={className} size={size} />
);

export const ActivityIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiActivity className={className} size={size} />
);

// Navigation Icons
export const HomeIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiHome className={className} size={size} />
);

export const MenuIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiMenu className={className} size={size} />
);

export const CloseIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiX className={className} size={size} />
);

export const ChevronRightIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiChevronRight className={className} size={size} />
);

export const ArrowRightIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiArrowRight className={className} size={size} />
);

export const ArrowLeftIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiArrowLeft className={className} size={size} />
);

// Contact Icons
export const MailIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiMail className={className} size={size} />
);

export const PhoneIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiPhone className={className} size={size} />
);

export const ClockIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiClock className={className} size={size} />
);

export const WhatsAppIcon = ({ className = '', size = 24 }: IconProps) => (
  <FaWhatsapp className={className} size={size} />
);

// Social Icons
export const GithubIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiGithub className={className} size={size} />
);

export const TwitterIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiTwitter className={className} size={size} />
);

export const LinkedinIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiLinkedin className={className} size={size} />
);

export const InstagramIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiInstagram className={className} size={size} />
);

// Other Icons
export const CheckIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiCheck className={className} size={size} />
);

export const StarIcon = ({ className = '', size = 24 }: IconProps) => (
  <FiStar className={className} size={size} />
);

// Icon mapping for easy access
export const iconMap = {
  rocket: RocketIcon,
  zap: ZapIcon,
  users: UsersIcon,
  book: BookIcon,
  shield: ShieldIcon,
  settings: SettingsIcon,
  sparkles: SparklesIcon,
  home: HomeIcon,
  menu: MenuIcon,
  close: CloseIcon,
  chevronRight: ChevronRightIcon,
  arrowRight: ArrowRightIcon,
  arrowLeft: ArrowLeftIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  clock: ClockIcon,
  whatsapp: WhatsAppIcon,
  github: GithubIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  check: CheckIcon,
  star: StarIcon,
};
