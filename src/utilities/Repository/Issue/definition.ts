import type {
  Repository_Issue_Label,
} from './Label';

interface Repository_Issue {
  title: string;
  body: string;
  labels: Repository_Issue_Label[];
  /** a.k.a. "type" */
  category:
    | 'Feature'
    | 'Bug'
    | 'Task'
  ;
}

export type {
  Repository_Issue,
};
