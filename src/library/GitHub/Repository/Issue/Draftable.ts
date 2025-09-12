import {
  GitHub_Repository_Issue,
} from './definition.ts';

function GitHub_Repository_Issue_Draftable(
  givenSite: URL,
) {
  return class GitHub_Repository_Issue_Draftable
    extends GitHub_Repository_Issue {
    public static get site(): URL {
      return new URL(givenSite.toString().concat('/issues'));
    }
  };
}

export {
  GitHub_Repository_Issue_Draftable,
};
