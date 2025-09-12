import type {
  GitHub_Repository_Issue_Label,
} from './Label';

interface GitHub_Repository_Issue {
  title: string;
  body: string;
  labels: GitHub_Repository_Issue_Label[];
  /** a.k.a. "type" */
  category:
    | 'Feature'
    | 'Bug'
    | 'Task'
  ;
}

export type {
  GitHub_Repository_Issue,
};
