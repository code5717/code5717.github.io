import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function ensureGsapRegistered() {
  if (registered) {
    return;
  }

  gsap.registerPlugin(useGSAP, ScrollTrigger);
  registered = true;
}
