import URLComponent from '@/library/URLComponent';

import {
  GitHub_site,
} from '../site';

import {
  GitHub_Repository_Issue,
} from './Issue';

class GitHub_Repository<
  SomeOrganization extends string,
  SomeProject extends string,
> {
  public constructor(
    public organization: SomeOrganization,
    public project: SomeProject,
  ) {}

  public get path(): URLComponent.Path {
    return URLComponent.Path(`/${this.organization}/${this.project}`);
  }

  public get site(): URL {
    return new URL(GitHub_site.toString().concat(this.path.toString()));
  }

  public get Issue() {
    return GitHub_Repository_Issue.Draftable(this.site);
  }
}

export {
  GitHub_Repository,
};
