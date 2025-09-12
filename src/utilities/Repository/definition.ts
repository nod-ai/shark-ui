import GitHub from '@/library/GitHub';

const Repository = {
  /** Creates a URL that drafts a new issue with pre-populated fields  */
  draftIssue(
    givenIssue: GitHub.Repository.Issue,
  ): URL {
    const SharkUIRepository = new GitHub.Repository('nod-ai', 'shark-ui');
    return SharkUIRepository.Issue.from(givenIssue).draft;
  },
};

export {
  Repository,
};
