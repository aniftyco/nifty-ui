import './app.css';

import Alpine from 'alpinejs';
import htmx from 'htmx.org';

declare global {
  interface Window {
    Alpine: typeof Alpine;
    htmx: typeof htmx;
    toggleDarkMode: () => void;
  }
}

window.Alpine = Alpine;
window.htmx = htmx;

Alpine.start();

window.toggleDarkMode = () => {
  const html = document.querySelector('html');
  const lightToggle = document.querySelector('#light-toggle');
  const darkToggle = document.querySelector('#dark-toggle');

  if (html!.classList.contains('dark')) {
    lightToggle!.classList.remove('hidden');
    darkToggle!.classList.add('hidden');
    html!.classList.remove('dark');
    html!.classList.add('light');
  } else {
    lightToggle!.classList.add('hidden');
    darkToggle!.classList.remove('hidden');
    html!.classList.remove('light');
    html!.classList.add('dark');
  }
};

require('htmx.org/dist/ext/head-support');
require('htmx-ext/dist/body-support');
require('htmx-ext/dist/csrf-token');
