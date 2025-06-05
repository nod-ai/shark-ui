type Repository_Issue_title_ = string;
type Repository_Issue_body_ = string;

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

    const errorIssue_title: Repository_Issue_title_ = `[Unexpected Error]: can't <some task> when <some context>`;
    const errorIssue_body: Repository_Issue_body_ = `Error Message:\n${givenErrorMessage}`.replace('\n', '\n> ');

    referencedParameters.set('title', errorIssue_title);
    referencedParameters.set('body', errorIssue_body);
    referencedParameters.set('labels', ['bug'].join());
    referencedParameters.set('type', 'Bug');

    return mutableDraft;
  },
};

export {
  Repository as default,
};
