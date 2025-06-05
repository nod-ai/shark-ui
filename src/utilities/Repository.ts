type Repository_Issue_Label =
  | 'bug'
  | 'enhancement'
  | 'documentation';

type Repository_Issue_Type =
  | 'Feature'
  | 'Bug'
  | 'Task';

interface Repository_Issue {
  title: string;
  body: string;
  labels: Repository_Issue_Label[];
  type: Repository_Issue_Type;
}

const Repository = {
  get emptyDraftOfNewIssue(): URL {
    return new URL('https://github.com/nod-ai/shark-ui/issues/new');
  },
  /** Creates a URL that drafts a new issue with pre-populated fields  */
  draftIssueFor(
    givenErrorMessage: string,
  ): URL {
    const mutableDraft = this.emptyDraftOfNewIssue;
    const referencedParameters = mutableDraft.searchParams;

    const errorIssue: Repository_Issue = {
      title : `[Unexpected Error]: can't <some task> when <some context>`,
      body  : `Error Message:\n${givenErrorMessage}`.replace('\n', '\n> '),
      labels: ['bug'],
      type  : 'Bug',
    };

    referencedParameters.set('title', errorIssue.title);
    referencedParameters.set('body', errorIssue.body);
    referencedParameters.set('labels', errorIssue.labels.join());
    referencedParameters.set('type', errorIssue.type);

    return mutableDraft;
  },
};

export {
  Repository as default,
};
