#!/usr/bin/env node

const {execSync} = require('child_process');

console.log("Installing proper bundler version")
execSync("gem install bundler:2.2.27");
console.log('Installing Pods');
execSync("npx pod-install");
