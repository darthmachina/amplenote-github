const plugin = 
{
  // --------------------------------------------------------------------------------------
  constants: {
    version: "1.0.0",
    githubSlugRegex: new RegExp("github project\\s*:\\s*([a-z\\/\\-]+)$", "mi")
  },

  // --------------------------------------------------------------------------
  // https://www.amplenote.com/help/developing_amplenote_plugins#replaceText
  replaceText: {
    async run(app, text) {
      console.log("amplenote-github.replaceText");

      if (text.indexOf('.') > -1 || isNaN(Number(text))) {
        app.alert("You must select only a valid integer for the issue number");
        return null
      }

      // Find project slug from note
      console.log("Finding note");
      const note = await app.notes.find(app.context.noteUUID);
      console.log("Getting content");
      const content = await note.content();
      console.log("Finding project");
      const project = this.constants.githubSlugRegex.exec(content);
      if (!project || project.length != 2) {
        app.alert("'Github Project:' must be specified on the note");
        return null;
      }
  
      // Fetch issue information
      console.log(`Getting issue: ${project[1]}, ${text}`);
      const issue = await this._getIssueFromGithub(project[1], text);
      if (!issue) {
        app.alert("Error getting Issue from GitHub");
        return null;
      }

      console.log(`Githib issue: ${issue.title}`);
      app.context.replaceSelection(`${issue.title} [Github](https://github.com/${project[1]}/issues/${text})`);
      return null;
    },

    // async check(app) {
    //   try {
    //     const sourceTaskUUID = app.context.taskUUID;
    //     console.log(sourceTaskUUID);

    //     if (!sourceTaskUUID || sourceTaskUUID === undefined) {
    //       return false;
    //     }
    //     return true;
    //   } catch (err) {
    //     app.alert(err);
    //   }
    // }
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
      console.log(`GET ok, returning JSON`);
      return await response.json();
    }
  },
};
export default plugin;
