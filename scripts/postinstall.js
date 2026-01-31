#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const skillsArchive = path.join(__dirname, '../templates/base/.claude/skills.tar.gz');
const skillsDir = path.join(__dirname, '../templates/base/.claude/skills');

// Only extract if archive exists and skills folder doesn't
if (fs.existsSync(skillsArchive) && !fs.existsSync(skillsDir)) {
  try {
    const claudeDir = path.join(__dirname, '../templates/base/.claude');
    execSync(`tar -xzf skills.tar.gz`, { cwd: claudeDir, stdio: 'ignore' });
  } catch (err) {
    // Silently fail - skills are optional enhancement
  }
}
