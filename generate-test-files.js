const fs = require('fs');
const path = require('path');

const featureDirPath = process.argv.pop();
const acitityFilePath = process.argv.pop();

console.log("args", acitityFilePath, featureDirPath);

const activityData = JSON.parse(fs.readFileSync(acitityFilePath, { encoding: 'utf8' }));

activityData.activity.map((activity, activityIdx) => {
    activity.action.map((action, actionIdx) => {
        const targetPath = path.join(featureDirPath, 'action-' + activityIdx + '-' + actionIdx + '.feature');
        let feature = `
Feature: ${action.action_verbal}
  As a/an ${activity.role}
  I ${action.intenttype} ${action.action_verbal}
  so that ${action.goal}
`;

        action.operation.map(operation => {
            feature += `
  Scenario: ${operation.intenttype + ' ' +  operation.operation_verbal}
`;
            operation.condition.map (condition => {
                feature += `    ${condition.conditionttype.slice(0,1).toUpperCase() + condition.conditionttype.slice(1).toLowerCase() } ${condition.criteria}\n`;
            });
        });

        console.log("feature", feature);
        fs.writeFile(targetPath, feature, 'utf-8', (err, data) => console.log(err ? err : "success: " + targetPath));
    })
})
