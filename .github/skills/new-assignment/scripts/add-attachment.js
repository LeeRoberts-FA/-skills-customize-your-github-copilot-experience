const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "../../../..");
const configPath = path.join(root, "config.json");
const [id, name, file, type] = process.argv.slice(2);
if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || !name?.trim() || !file || !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(file) || !["python","csv","json","txt","html","javascript","css"].includes(type)) {
  console.error('Usage: add-attachment.js <id> "<display-name>" <filename> <type>'); process.exit(1);
}
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const assignment = config.assignments.find(a => a.id === id);
if (!assignment) { console.error("Unknown assignment"); process.exit(1); }
const dir = path.join(root, "assignments", id);
const target = path.join(dir, file);
if (!fs.existsSync(target) || !fs.statSync(target).isFile() || !fs.realpathSync(target).startsWith(fs.realpathSync(dir) + path.sep) || !fs.realpathSync(dir).startsWith(fs.realpathSync(path.join(root, "assignments")) + path.sep)) {
  console.error("Attachment must be an existing file inside the assignment"); process.exit(1);
}
assignment.attachments ??= [];
if (assignment.attachments.some(a => a.file === file)) { console.log("Already attached"); process.exit(0); }
assignment.attachments.push({name, file, type});
fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
console.log("Attached " + file);
