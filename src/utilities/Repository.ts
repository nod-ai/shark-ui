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

    referencedParameters.set('title', `[Unexpected Error]: can't <some task> when <some context>`);
    const quotedErrorMessage = `Error Message:\n${givenErrorMessage}`.replace('\n', '\n> ');

    referencedParameters.set('body', quotedErrorMessage);
    referencedParameters.set('labels', ['bug'].join());
    referencedParameters.set('type', 'Bug');

    return mutableDraft;
  },
};

export {
  Repository as default,
};
