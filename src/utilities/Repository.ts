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

    const errorIssue_title: Repository_Issue['title'] = `[Unexpected Error]: can't <some task> when <some context>`;
    const errorIssue_body: Repository_Issue['body'] = `Error Message:\n${givenErrorMessage}`.replace('\n', '\n> ');
    const errorIssue_labels: Repository_Issue['labels'] = ['bug'];
    const errorIssue_type: Repository_Issue['type'] = 'Bug';

    referencedParameters.set('title', errorIssue_title);
    referencedParameters.set('body', errorIssue_body);
    referencedParameters.set('labels', errorIssue_labels.join());
    referencedParameters.set('type', errorIssue_type);

    return mutableDraft;
  },
};

export {
  Repository as default,
};
