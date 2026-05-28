import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

let registered = false;

export function ensureGsapRegistered() {
  if (registered) {
    return;
  }

  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    ScrollToPlugin,
    Flip,
    SplitText,
    Draggable,
    InertiaPlugin
  );
  registered = true;
}
