import simpleGit from "simple-git";
import jsonfile from "jsonfile";
import moment from "moment";

const git = simpleGit();
const path = "./data.json";

export const makeCommit = async (dateStr, message) => {
    // Ensure the date is formatted correctly for git
    const date = moment(dateStr).format();
    const data = { date };

    console.log(`Preparing to commit on: ${date} with message: "${message}"`);

    return new Promise((resolve, reject) => {
        jsonfile.writeFile(path, data, async (err) => {
            if (err) {
                console.error("Failed to write file:", err);
                reject(err);
                return;
            }

            try {
                await git.add([path]);
                
                await git.env({
                    GIT_AUTHOR_DATE: date,
                    GIT_COMMITTER_DATE: date
                }).commit(message || `Update data.json at ${date}`);
                
                await git.push();
                console.log("Pushed commit with backdated timestamp!");
                resolve();
            } catch (gitErr) {
                console.error("Git error:", gitErr);
                reject(gitErr);
            }
        });
    });
};
