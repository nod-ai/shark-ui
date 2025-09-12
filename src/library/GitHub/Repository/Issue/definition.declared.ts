import type {
  GitHub_Repository_Issue_Label,
} from './Label';

class GitHub_Repository_Issue {
  public constructor(
    public title: string,
    public body: string,
    public labels: GitHub_Repository_Issue_Label[],
    /** a.k.a. "type" */
    public category:
      | 'Feature'
      | 'Bug'
      | 'Task',
  ) {}
}

export {
  GitHub_Repository_Issue,
};
