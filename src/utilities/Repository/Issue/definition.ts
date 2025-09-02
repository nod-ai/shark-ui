type Repository_Issue_Label =
  | 'bug'
  | 'enhancement'
  | 'documentation'
;

type Repository_Issue_Category =
  | 'Feature'
  | 'Bug'
  | 'Task'
;

interface Repository_Issue {
  title: string;
  body: string;
  labels: Repository_Issue_Label[];
  /** a.k.a. "type" */
  category: Repository_Issue_Category;
}

export type {
  Repository_Issue,
};
