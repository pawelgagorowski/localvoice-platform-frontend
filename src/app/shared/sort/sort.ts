import { Dictionary } from 'vue-router/types/router';

export type SortDirection = 'asc' | 'desc';

export class Sort {
  constructor(public active?: string, public direction?: SortDirection) {
    if (!direction) {
      this.direction = 'asc';
    }
  }

  get desc(): boolean {
    return this.direction === 'desc';
  }

  fromQuery(query: Dictionary<string | (string | null)[]>): Sort {
    this.active = (query.sort as string) || this.active;
    this.direction = (query.order as SortDirection) || this.direction;
    return this;
  }
}
