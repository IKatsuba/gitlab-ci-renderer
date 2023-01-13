import { JobBuilder } from './job.builder';

export class PagesJobBuilder extends JobBuilder {
  constructor() {
    super('pages');
  }
}

export function pagesJob(): PagesJobBuilder {
  return new PagesJobBuilder();
}
