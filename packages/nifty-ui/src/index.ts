import clsx from 'clsx';
import { addCollection, edgeIconify } from 'edge-iconify';
import { join } from 'path';
import { twMerge } from 'tailwind-merge';

import { icons as brands } from '@iconify-json/cib';
import { icons as flags } from '@iconify-json/cif';
import { icons as tabler } from '@iconify-json/tabler';

import type { ApplicationContract } from '@ioc:Adonis/Core/Application';

export default class NiftyUiProvider {
  public static needsApplication = true;

  constructor(protected app: ApplicationContract) {}

  public async boot() {
    const View = this.app.container.use('Adonis/Core/View');

    addCollection(tabler);
    addCollection(brands);
    addCollection(flags);
    View.use(edgeIconify);

    View.mount('ui', join(__dirname, '../views'));
    View.mount('email', join(__dirname, '../email'));

    View.global('clsx', (...args: any[]) => {
      return twMerge(clsx(...args));
    });
  }
}
