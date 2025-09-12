import GitHub from '@/library/GitHub';

const Repository = {
  /** Creates a URL that drafts a new issue with pre-populated fields  */
  draftIssue(
    given: GitHub.Repository.Issue,
  ): URL {
    const SharkUIRepository = new GitHub.Repository('nod-ai', 'shark-ui');
    const mutableDraft = new URL(SharkUIRepository.Issue.site.toString().concat('/new'));
    const referencedParameters = mutableDraft.searchParams;

    referencedParameters.set('title', given.title);
    referencedParameters.set('body', given.body);
    referencedParameters.set('labels', given.labels.join());
    referencedParameters.set('type', given.category);

    return mutableDraft;
  },
};

export {
  Repository,
};
