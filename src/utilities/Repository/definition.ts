import GitHub from '@/library/GitHub';

const Repository = {
  /** Creates a URL that drafts a new issue with pre-populated fields  */
  Issue_from(
    givenIssue: GitHub.Repository.Issue,
  ) {
    const SharkUIRepository = new GitHub.Repository('nod-ai', 'shark-ui');
    return SharkUIRepository.Issue.from(givenIssue);
  },
};

export {
  Repository,
};
