import {
  GitHub_Repository_Issue,
} from './definition.ts';

function GitHub_Repository_Issue_Draftable(
  givenSite: URL,
) {
  return class GitHub_Repository_Issue_Draftable
    extends GitHub_Repository_Issue {
    public static from(
      givenIssue: Pick<GitHub_Repository_Issue_Draftable,
      | 'title'
      | 'body'
      | 'labels'
      | 'category'
      >,
    ): GitHub_Repository_Issue_Draftable {
      const clonedIssue = new GitHub_Repository_Issue_Draftable(
        givenIssue.title,
        givenIssue.body,
        givenIssue.labels,
        givenIssue.category,
      );

      return clonedIssue;
    }

    public static get site(): URL {
      return new URL(givenSite.toString().concat('/issues'));
    }

    /** A URL to a pre-populated draft of this issue  */
    public get draft(): URL {
      const mutableDraft = new URL(GitHub_Repository_Issue_Draftable.site.toString().concat('/new'));
      const referencedParameters = mutableDraft.searchParams;

      referencedParameters.set('title'/* */, this.title/*    */);
      referencedParameters.set('body'/*  */, this.body/*     */);
      referencedParameters.set('labels'/**/, this.labels.join());
      referencedParameters.set('type'/*  */, this.category/* */);

      return mutableDraft;
    }
  };
}

export {
  GitHub_Repository_Issue_Draftable,
};
