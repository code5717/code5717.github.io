import type { ReactNode } from 'react';
import {
  IconBriefcase,
  IconFolder,
  IconGlobe,
  IconLayers,
  IconMail,
  IconUser
} from './icons';

export const sectionIds = ['hero', 'experience', 'skills', 'projects', 'background', 'connect'] as const;

export type SectionId = (typeof sectionIds)[number];

export type NavItem = {
  href: string;
  id: SectionId;
  label: string;
  icon: ReactNode;
};

export const navItems: NavItem[] = [
  { href: '#hero', id: 'hero', label: 'Profile', icon: <IconUser size={18} /> },
  { href: '#experience', id: 'experience', label: 'Experience', icon: <IconBriefcase size={18} /> },
  { href: '#skills', id: 'skills', label: 'Skills', icon: <IconLayers size={18} /> },
  { href: '#projects', id: 'projects', label: 'Projects', icon: <IconFolder size={18} /> },
  { href: '#background', id: 'background', label: 'Background', icon: <IconGlobe size={18} /> },
  { href: '#connect', id: 'connect', label: "Let's Connect", icon: <IconMail size={18} /> }
];

export const heroSignal = [
  'Agentic workflows',
  'Arabic NLP',
  'Computer vision',
  'CUDA + HPC',
  'Systems design'
];

export const RESUME_PATH = '/RESUME-ABDUSSAMAD-APRIL-2026.pdf';

export function navBlurb(label: string): string {
  switch (label) {
    case 'Profile':
      return 'Current role, location, and working focus.';
    case 'Experience':
      return 'Teams, systems, and delivery history.';
    case 'Projects':
      return 'Builds tuned for real constraints.';
    case 'Skills':
      return 'Languages, platforms, and tooling.';
    case 'Background':
      return 'Education, writing, and fluency.';
    default:
      return 'Open to new collaborations and roles.';
  }
}
