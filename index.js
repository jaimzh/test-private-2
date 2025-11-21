import simpleGit from "simple-git";
import jsonfile from "jsonfile";
import moment from "moment";

const git = simpleGit();
const path = "./data.json";
const date = moment().subtract(22, 'days').format(); 
const data = { date };

jsonfile.writeFile(path, data, async () => {
  try {
    await git.add([path]);
    
    await git.env({
      GIT_AUTHOR_DATE: date,
      GIT_COMMITTER_DATE: date
    }).commit(`Update data.json at ${date}`);
    
    await git.push();
    console.log("Pushed commit with backdated timestamp!");
  } catch (err) {
    console.error("Error:", err);
  }
});