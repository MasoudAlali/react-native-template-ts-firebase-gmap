#!/usr/bin/env node

const {execSync} = require('child_process');

console.log('Installing Pods');
execSync("npx pod-install");
