import { initScroll } from './devin/scroll.js';

// Ato I
import { initEpico01 } from './devin/epico-01.js';
import { initEpico02 } from './devin/epico-02.js';
import { initEpico03 } from './devin/epico-03.js';

// Ato II - parte A
import { initEpico04 } from './devin/epico-04.js';
import { initEpico05 } from './devin/epico-05.js';
import { initEpico06 } from './devin/epico-06.js';

// Ato II - parte B + Ato III
import { initEpico07 } from './devin/epico-07.js';
import { initEpico08 } from './devin/epico-08.js';
import { initEpico09 } from './devin/epico-09.js';

async function main() {
  // 1. Scroll engine (Lenis + GSAP ScrollTrigger)
  initScroll();

  // 2. Ato I — Seções 1-8
  initEpico01();
  initEpico02();
  initEpico03();

  // 3. Ato II parte A — Seções 9-15
  initEpico04();
  initEpico05();
  initEpico06();

  // 4. Ato II parte B + Ato III — Seções 16-33
  initEpico07();
  initEpico08();
  initEpico09();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
