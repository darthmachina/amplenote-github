const plugin = {
  // --------------------------------------------------------------------------------------
  constants: {
    version: "1.0.0",
    githubSlugRegex: ""
  },

  // --------------------------------------------------------------------------
  // https://www.amplenote.com/help/developing_amplenote_plugins#replaceText
  replaceText: {
    async run(app, text) {
      // Find project slug from note
      const note = await app.notes.find(app.context.noteUUID);
      const content = await note.content;

    },

    async check(app) {
      try {
        const sourceTaskUUID = app.context.taskUUID;
        console.log(sourceTaskUUID);

        if (!app.context.taskUUID || app.context.taskUUID === undefined) {
          return false;
        }
        return true;
      } catch (err) {
        app.alert(err);
      }
    }
  }
};
export default plugin;
