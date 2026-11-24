const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "../../../..");
const configPath = path.join(root, "config.json");
const [id, title, description] = process.argv.slice(2);
if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || !title?.trim() || !description?.trim()) {
  console.error('Usage: update-config.js <kebab-case-id> "<title>" "<description>"');
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
if (config.assignments.some(a => a.id === id)) {
  console.error("Assignment ID already exists"); process.exit(1);
}
const dir = path.join(root, "assignments", id);
if (!fs.existsSync(path.join(dir, "README.md")) || !fs.realpathSync(dir).startsWith(fs.realpathSync(path.join(root, "assignments")) + path.sep)) {
  console.error("Create an assignment README inside assignments first"); process.exit(1);
}
const dueDate = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
config.assignments.push({ id, title, description, path: "assignments/" + id, dueDate });
fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
console.log("Added " + id + " (due " + dueDate + ")");
