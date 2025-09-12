import URLComponent from '@/library/URLComponent';

class GitHub_Repository<
  SomeOrganization extends string,
  SomeProject extends string,
> {
  public constructor(
    public organization: SomeOrganization,
    public project: SomeProject,
  ) {}

  public get path(): URLComponent.Path {
    const outcomeOfParsingPath = URLComponent.Path.parsedFrom(`/${this.organization}/${this.project}`);
    const parsedPath = outcomeOfParsingPath.forciblyUnwrap(/* a failed unwrap would mean the hardcoded template was malformed */);
    return parsedPath;
  }
}

export {
  GitHub_Repository,
};
