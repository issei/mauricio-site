import { initParadoxes } from './paradoxes.js';
import { initTabs } from './tabs.js';
import { initTerms } from './terms.js';
import { initVideo } from './video.js';
import { initDiagnostic } from './diagnostic.js';
import { initReferences } from './references.js';

function boot() {
  initParadoxes(document);
  initTabs(document);
  initTerms(document);
  initVideo(document);
  initDiagnostic(document.getElementById('diagnostic-widget'));
  initReferences(document.getElementById('acervo-widget'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
