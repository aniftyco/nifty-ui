import 'tailwindcss/tailwind.css';

import Alpine from 'alpinejs';

import collapse from '@alpinejs/collapse';

declare global {
  interface Window {
    Alpine: typeof Alpine;
  }
}

window.Alpine = Alpine;

Alpine.plugin(collapse);
Alpine.start();
