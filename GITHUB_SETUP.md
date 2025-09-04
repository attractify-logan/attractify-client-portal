# GitHub Setup Guide - Attractify Client Portal

This guide walks you through setting up the Attractify Client Portal on GitHub, including repository creation, collaboration setup, and automated deployments.

## 🚀 Quick Start

### **Step 1: Create GitHub Repository**

**Option A: Create New Repository on GitHub.com**
1. Go to [GitHub.com](https://github.com)
2. Click "New repository" (green button)
3. Fill in repository details:
   - **Repository name**: `attractify-client-portal`
   - **Description**: `Professional client onboarding portal for Attractify Marketing`
   - **Visibility**: Private (recommended) or Public
   - **Initialize**: Don't initialize (we have existing code)
4. Click "Create repository"

**Option B: GitHub CLI (if installed)**
```bash
gh repo create attractify-client-portal --private --description "Professional client onboarding portal for Attractify Marketing"
```

### **Step 2: Initialize Local Git Repository**
```bash
# Navigate to your project folder
cd attractify-client-portal

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Attractify Client Portal with full functionality"

# Add GitHub remote (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/attractify-client-portal.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 📁 Repository Structure

Your GitHub repository will contain:

```
attractify-client-portal/
├── .github/                    # GitHub-specific files
│   └── workflows/             # GitHub Actions (CI/CD)
├── public/                    # Static assets
│   ├── attractify-logo.png    # Company logo
│   └── favicon.ico           # Site icon
├── src/                      # Source code
│   ├── components/           # React components
│   ├── lib/                 # Utilities
│   ├── App.jsx              # Main app
│   └── main.jsx             # Entry point
├── .env.example             # Environment template
├── .gitignore              # Git ignore rules
├── DEPLOYMENT.md           # Deployment guide
├── GITHUB_SETUP.md         # This file
├── README.md               # Project documentation
├── package.json            # Dependencies
├── tailwind.config.js      # Styling config
└── vite.config.js          # Build config
```

## 🔧 Repository Configuration

### **Step 3: Configure Repository Settings**

**Repository Settings:**
1. Go to repository → Settings
2. **General**:
   - Set default branch to `main`
   - Enable "Automatically delete head branches"
3. **Collaborators** (if team access needed):
   - Add team members with appropriate permissions
4. **Branches**:
   - Add branch protection rules for `main`
   - Require pull request reviews
   - Require status checks

### **Step 4: Create .gitignore File**
```bash
# Create .gitignore if it doesn't exist
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Production builds
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Temporary folders
tmp/
temp/

# Cache
.cache/
.parcel-cache/

# Build tools
.vite/
EOF
```

## 🤝 Collaboration Setup

### **Step 5: Team Access & Permissions**

**Add Collaborators:**
1. Repository → Settings → Collaborators
2. Click "Add people"
3. Enter GitHub usernames or emails
4. Set permission levels:
   - **Admin**: Full access (for project leads)
   - **Write**: Push access (for developers)
   - **Read**: View only (for stakeholders)

**Team Workflow:**
```bash
# Team members clone repository
git clone https://github.com/YOUR_USERNAME/attractify-client-portal.git
cd attractify-client-portal

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push feature branch
git push origin feature/new-feature

# Create pull request on GitHub
```

### **Step 6: Branch Protection Rules**

**Protect Main Branch:**
1. Repository → Settings → Branches
2. Click "Add rule"
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1-2 reviewers)
   - ✅ Dismiss stale reviews
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Include administrators

## 🔄 Automated Deployments

### **Step 7: GitHub Actions for CI/CD**

**Create Workflow File:**
```bash
mkdir -p .github/workflows
```

**Netlify Deployment Workflow:**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2.0
      with:
        publish-dir: './dist'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

**Vercel Deployment Workflow:**
```yaml
# .github/workflows/vercel.yml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Install Vercel CLI
      run: npm install --global vercel@latest
      
    - name: Pull Vercel Environment Information
      run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      
    - name: Build Project Artifacts
      run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      
    - name: Deploy Project Artifacts to Vercel
      run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### **Step 8: Configure Secrets**

**Add Repository Secrets:**
1. Repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add required secrets:

**For Netlify:**
- `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
- `NETLIFY_SITE_ID`: Your Netlify site ID

**For Vercel:**
- `VERCEL_TOKEN`: Your Vercel access token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

## 📋 Issue Templates

### **Step 9: Create Issue Templates**

**Bug Report Template:**
```markdown
<!-- .github/ISSUE_TEMPLATE/bug_report.md -->
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- Browser [e.g. chrome, safari]
- Version [e.g. 22]
- Device [e.g. iPhone6, Desktop]

**Additional context**
Add any other context about the problem here.
```

**Feature Request Template:**
```markdown
<!-- .github/ISSUE_TEMPLATE/feature_request.md -->
---
name: Feature request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: enhancement
assignees: ''
---

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## 📊 Project Management

### **Step 10: GitHub Projects (Optional)**

**Create Project Board:**
1. Repository → Projects → New project
2. Choose template: "Automated kanban"
3. Add columns: To Do, In Progress, Review, Done
4. Link issues and pull requests

**Project Automation:**
- Auto-move cards based on PR status
- Auto-close issues when PR merged
- Label-based automation

## 🔒 Security

### **Step 11: Security Configuration**

**Enable Security Features:**
1. Repository → Settings → Security
2. Enable:
   - ✅ Dependency graph
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates
   - ✅ Code scanning alerts

**Security Workflow:**
```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  security:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Run npm audit
      run: npm audit --audit-level moderate
      
    - name: Run Snyk to check for vulnerabilities
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

## 📈 Analytics & Insights

### **Step 12: Repository Insights**

**Monitor Repository Health:**
- Repository → Insights → Community
- Add missing files: CODE_OF_CONDUCT.md, CONTRIBUTING.md
- Monitor traffic and clones
- Review dependency graph

**Code Quality:**
- Set up code quality checks
- Monitor code coverage
- Review security advisories

## 🎯 Best Practices

### **Commit Message Convention**
```bash
# Format: type(scope): description
git commit -m "feat(dashboard): add client progress tracking"
git commit -m "fix(onboarding): resolve step completion bug"
git commit -m "docs(readme): update installation instructions"
git commit -m "style(ui): improve mobile responsiveness"
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, UI changes
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

### **Pull Request Template**
```markdown
<!-- .github/pull_request_template.md -->
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] All tests pass

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🆘 Troubleshooting

### **Common GitHub Issues**

**Authentication Problems:**
```bash
# Use personal access token
git remote set-url origin https://YOUR_TOKEN@github.com/USERNAME/REPO.git

# Or use SSH
git remote set-url origin git@github.com:USERNAME/REPO.git
```

**Large File Issues:**
```bash
# Remove large files from history
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch large-file.zip' --prune-empty --tag-name-filter cat -- --all
```

**Sync Fork:**
```bash
# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/REPO.git

# Fetch upstream changes
git fetch upstream

# Merge upstream changes
git checkout main
git merge upstream/main
```

## 📞 Support

**GitHub Resources:**
- [GitHub Docs](https://docs.github.com/)
- [GitHub Community](https://github.community/)
- [GitHub Support](https://support.github.com/)

**Project Support:**
- **Email**: admin@attractifymarketing.com
- **Issues**: Create GitHub issues for bugs/features

---

**Setup Checklist:**
- [ ] Repository created
- [ ] Local git initialized
- [ ] Code pushed to GitHub
- [ ] Collaborators added
- [ ] Branch protection enabled
- [ ] CI/CD workflow configured
- [ ] Secrets configured
- [ ] Issue templates created
- [ ] Security features enabled
- [ ] Documentation complete

*Your Attractify Client Portal is now ready for collaborative development! 🚀*

