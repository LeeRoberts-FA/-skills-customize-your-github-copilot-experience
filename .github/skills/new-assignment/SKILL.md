---
name: new-assignment
description: Create, scaffold, add, or generate a programming homework assignment or coding exercise for Mergington High School.
---
# Create New Programming Assignment

1. Gather the topic, difficulty, and any required starter files. Read [the design guide](references/assignment-guide.md).
2. Create a unique kebab-case assignment folder under `assignments/`. Write README.md using [the template](../../../templates/assignment-template.md) and the assignment-specific instructions. Add optional incomplete starter code or synthetic data.
3. Register the assignment using the bundled scripts, from the repository root:
   `node .github/skills/new-assignment/scripts/update-config.js <id> "<title>" "<description>"`
   Register each attachment:
   `node .github/skills/new-assignment/scripts/add-attachment.js <id> "<display-name>" <filename> <type>`
   Do not edit config.json manually during normal skill operation. Run the scripts serially; review changes before committing.
4. Verify the config entry, README, and attachments, then run `node --test tests/assignment-scripts.test.js`. Report actual results and review the portal preview if available. Never invent successful preview or tool execution.
