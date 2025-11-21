import simpleGit from "simple-git";
import jsonfile from "jsonfile";
import moment from "moment";

const git = simpleGit();
const path = "./data.json";

export const makeCommit = async (dateStr, message) => {
    // Format the date just like in index.js
    const date = moment(dateStr).format();
    const data = { date };

    console.log(`Preparing to commit on: ${date} with message: "${message}"`);

    // Use the EXACT same pattern as index.js
    jsonfile.writeFile(path, data, async () => {
        try {
            await git.add([path]);
            
            await git.env({
                GIT_AUTHOR_DATE: date,
                GIT_COMMITTER_DATE: date
            }).commit(message || `Update data.json at ${date}`);
            
            await git.push();
            console.log("Pushed commit with backdated timestamp!");
        } catch (err) {
            console.error("Error:", err);
            throw err; // Re-throw so server.js catches it
        }
    });
};