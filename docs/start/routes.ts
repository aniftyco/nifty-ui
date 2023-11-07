/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import { readFileSync } from 'fs';
import { plugin as tableOfContent } from 'markdown-toc';
import { join } from 'path';
import { Remarkable } from 'remarkable';
import meta from 'remarkable-meta';
import { linkify } from 'remarkable/linkify';

import Route from '@ioc:Adonis/Core/Route';
import { string } from '@poppinss/utils/build/helpers';

import type { HeadingOpenToken, HeadingCloseToken, ContentToken } from 'remarkable/lib';

const headerIdLinks = (remarkable: Remarkable) => {
  const levels = [2, 3];
  const open = remarkable.renderer.rules.heading_open;
  const close = remarkable.renderer.rules.heading_close;

  remarkable.renderer.rules.heading_open = (tokens: HeadingOpenToken[], idx: number) => {
    const level = tokens[idx].hLevel;
    const content = (tokens[idx + 1] as ContentToken).content;
    const slug = string.dashCase(content);

    if (levels.indexOf(level) !== -1) {
      return `<h${level} id="${slug}" class="doc-heading">`;
    }

    return open(tokens, idx);
  };

  remarkable.renderer.rules.heading_close = (tokens: HeadingCloseToken[], idx: number) => {
    const level = tokens[idx].hLevel;
    const content = (tokens[idx - 1] as ContentToken).content;
    const slug = string.dashCase(content);

    if (levels.indexOf(level) !== -1) {
      return `<a href="#${slug}">#</a></h${level}>`;
    }

    return close(tokens, idx);
  };
};

const remarkable = new Remarkable({ html: true, typographer: true });
remarkable.use(meta).use(headerIdLinks).use(linkify);

Route.on('/').render('landing').as('landing');
Route.on('/docs').redirect('docs.page', { section: 'introduction' }).as('docs.index');
Route.get('/docs/:section/:page?', async ({ params, view }) => {
  const page = params.page ? `${params.section}/${params.page}` : params.section;
  const markdown = readFileSync(join(__dirname, '../content', `${page}.md`), 'utf8');
  const content = remarkable.render(markdown);
  const { json } = (new Remarkable() as any)
    .use(tableOfContent({ firsth1: false, stripHeadingTags: true }))
    .render(markdown);

  // Generate table of content from headings
  const toc: any[] = [];

  json.slice(1).forEach((item: { lvl: 2 | 3; content: string; slug: string }) => {
    if (item.lvl === 2) {
      toc.push({ anchor: item.content, slug: item.slug, items: [] });
    }

    if (item.lvl === 3) {
      toc[toc.length - 1].items.push({ anchor: item.content, slug: item.slug });
    }
  });

  return view.render('docs', { meta: (remarkable as any).meta, toc, content });
}).as('docs.page');
