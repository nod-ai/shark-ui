type Repository_Issue_Label =
  | 'bug'
  | 'enhancement'
  | 'documentation'
;

type Repository_Issue_Type =
  | 'Feature'
  | 'Bug'
  | 'Task'
;

interface Repository_Issue {
  title: string;
  body: string;
  labels: Repository_Issue_Label[];
  type: Repository_Issue_Type;
}

const Repository = {
  get emptyDraftOfNewIssue(): URL {
    const mutableURLForNewIssue = new URL('https://github.com/nod-ai/shark-ui/issues/new');
    return mutableURLForNewIssue;
  },
  /** Creates a URL that drafts a new issue with pre-populated fields  */
  draftIssue(
    given: Repository_Issue,
  ): URL {
    const mutableDraft = this.emptyDraftOfNewIssue;
    const referencedParameters = mutableDraft.searchParams;

    referencedParameters.set('title', given.title);
    referencedParameters.set('body', given.body);
    referencedParameters.set('labels', given.labels.join());
    referencedParameters.set('type', given.type);

    return mutableDraft;
  },
};

export {
  Repository as default,
};
