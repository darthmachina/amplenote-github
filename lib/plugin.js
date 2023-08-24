const plugin = 
{
  // --------------------------------------------------------------------------------------
  constants: {
    version: "1.0.1",
    githubSlugRegex: /github project\s*:{1,2}\s*([a-z\/\-]+)/mi
  },

  // --------------------------------------------------------------------------
  // https://www.amplenote.com/help/developing_amplenote_plugins#replaceText
  replaceText: {
    async run(app, text) {
      if (text.indexOf('.') > -1 || isNaN(Number(text))) {
        app.alert("You must select only a valid integer for the issue number");
        return null
      }

      // Find project slug from note
      const note = await app.notes.find(app.context.noteUUID);
      const content = await note.content();
      const project = this.constants.githubSlugRegex.exec(content);
      if (!project || project.length != 2) {
        app.alert("'Github Project:' must be specified on the note");
        return null;
      }
  
      // Fetch issue information
      const issue = await this._getIssueFromGithub(project[1], text);
      if (!issue) {
        app.alert("Error getting Issue from GitHub");
        return null;
      }

      app.context.replaceSelection(`${issue.title} [Github](https://github.com/${project[1]}/issues/${text})`);
      return null;
    },
  },

  // --------------------------------------------------------------------------
  async _getIssueFromGithub(projectSlug, issueId) {
    console.log(`_getIssueFromGithub: ${projectSlug}, ${issueId}`);
    const response = await fetch(
      `https://api.github.com/repos/${projectSlug}/issues/${issueId}`, 
      { method: 'GET', headers: {"Content-Type": "application/json"} }
    );

    if (!response.ok) {
      console.error(`Github error: ${response.status}`);
      return null
    } else {
      return await response.json();
    }
  },
};
export default plugin;
