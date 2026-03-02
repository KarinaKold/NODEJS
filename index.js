// node index add --title=Hello
// node index list

/*-----------------------------*/

const yargs = require("yargs");
const pkg = require("./package.json");
yargs.version(pkg.version);

// const { addNote, getNotes } = require("./notes.controller");
const { addNote, printNotes } = require("./notes.controller");

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    // console.log("Add command", title);
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    // console.log("List command");

    // const notes = await getNotes();
    // console.log(notes);
    printNotes();
  },
});

yargs.parse();
