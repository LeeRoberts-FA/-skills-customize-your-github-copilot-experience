const {test} = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const {spawnSync} = require("node:child_process");
const repo = path.resolve(__dirname, "..");
const scripts = ".github/skills/new-assignment/scripts";
test("bundled scripts register and attach files, reject duplicates and invalid paths", () => {
 const root = fs.mkdtempSync(path.join(os.tmpdir(), "assignment-test-"));
 try {
  fs.mkdirSync(path.join(root,scripts),{recursive:true});
  for(const name of ["update-config.js","add-attachment.js"]) fs.copyFileSync(path.join(repo,scripts,name),path.join(root,scripts,name));
  fs.mkdirSync(path.join(root,"assignments/demo"),{recursive:true});
  fs.writeFileSync(path.join(root,"assignments/demo/README.md"),"# Demo");
  fs.writeFileSync(path.join(root,"assignments/demo/start.py"),"pass");
  fs.writeFileSync(path.join(root,"config.json"),JSON.stringify({assignments:[]}));
  const run=(name,...args)=>spawnSync(process.execPath,[path.join(root,scripts,name),...args],{encoding:"utf8"});
  assert.equal(run("update-config.js","demo","Demo","Practice").status,0);
  assert.notEqual(run("update-config.js","demo","Duplicate","Practice").status,0);
  assert.notEqual(run("update-config.js","../bad","Bad","Bad").status,0);
  assert.equal(run("add-attachment.js","demo","Starter","start.py","python").status,0);
  assert.equal(run("add-attachment.js","demo","Starter","start.py","python").status,0);
  assert.notEqual(run("add-attachment.js","demo","Missing","missing.py","python").status,0);
  assert.notEqual(run("add-attachment.js","demo","Traversal","../README.md","txt").status,0);
  const cfg=JSON.parse(fs.readFileSync(path.join(root,"config.json"),"utf8"));
  assert.equal(cfg.assignments.length,1);
  assert.equal(cfg.assignments[0].attachments.length,1);
  assert.match(cfg.assignments[0].dueDate,/^\d{4}-\d{2}-\d{2}$/);
 } finally {fs.rmSync(root,{recursive:true,force:true});}
});
test("portal catalog contains unique IDs and all referenced files",()=>{
 const cfg=JSON.parse(fs.readFileSync(path.join(repo,"config.json"),"utf8"));
 assert.equal(new Set(cfg.assignments.map(a=>a.id)).size,cfg.assignments.length);
 for(const a of cfg.assignments){
  assert.ok(fs.existsSync(path.join(repo,a.path,"README.md")));
  for(const f of a.attachments||[]) assert.ok(fs.existsSync(path.join(repo,a.path,f.file)));
 }
});
