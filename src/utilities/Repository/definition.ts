import GitHub from '@/library/GitHub';

const Repository = {
  /** Creates a URL that drafts a new issue with pre-populated fields  */
  draftIssue(
    givenIssue: GitHub.Repository.Issue,
  ): URL {
    const SharkUIRepository = new GitHub.Repository('nod-ai', 'shark-ui');
    const mutableDraft = new URL(SharkUIRepository.Issue.site.toString().concat('/new'));
    const referencedParameters = mutableDraft.searchParams;

    referencedParameters.set('title', givenIssue.title);
    referencedParameters.set('body', givenIssue.body);
    referencedParameters.set('labels', givenIssue.labels.join());
    referencedParameters.set('type', givenIssue.category);

    return mutableDraft;
  },
};

export {
  Repository,
};
