# Contributing to MobileUurka Admin System

Thank you for your interest in contributing to MobileUurka! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/mobileuurka-admin-system.git`
3. Install dependencies: `npm install`
4. Copy environment file: `cp .env.example .env`
5. Start development server: `npm run dev`

## 📝 Development Guidelines

### Code Style
- Use ESLint configuration provided
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Add comments for complex logic

### Component Structure
```jsx
// Component imports
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Component definition
const ComponentName = ({ prop1, prop2 }) => {
  // Hooks
  const dispatch = useDispatch();
  const data = useSelector(state => state.slice.data);
  
  // State
  const [localState, setLocalState] = useState('');
  
  // Callbacks
  const handleAction = useCallback(() => {
    // Implementation
  }, [dependencies]);
  
  // Render
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### CSS Guidelines
- Use CSS modules or scoped styles
- Follow BEM naming convention
- Ensure responsive design
- Use CSS variables for colors
- Maintain consistency with existing styles

### Redux Guidelines
- Use Redux Toolkit
- Create typed slices
- Use proper action naming
- Implement proper error states
- Use selectors for complex state access

## 🔧 Development Workflow

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages
Follow conventional commits:
```
type(scope): description

feat(auth): add password reset functionality
fix(users): resolve user creation validation
docs(readme): update installation instructions
```

### Pull Request Process
1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Update documentation if needed
5. Submit pull request with clear description
6. Address review feedback

## 🧪 Testing

### Running Tests
```bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Writing Tests
- Write unit tests for utilities
- Write integration tests for components
- Test error scenarios
- Mock external dependencies

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex algorithms
- Explain business logic
- Update README for new features

### API Documentation
- Document new endpoints
- Update request/response examples
- Maintain API versioning info

## 🐛 Bug Reports

### Before Submitting
- Check existing issues
- Reproduce the bug
- Test in different browsers
- Gather system information

### Bug Report Template
```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
```

## ✨ Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features considered.

**Additional context**
Any other context or screenshots.
```

## 🔒 Security

### Reporting Security Issues
- Do not open public issues for security vulnerabilities
- Email security concerns to: security@mobileuurka.com
- Include detailed description and reproduction steps

### Security Guidelines
- Never commit sensitive data
- Use environment variables for secrets
- Validate all user inputs
- Implement proper authentication
- Follow OWASP guidelines

## 📋 Code Review Checklist

### For Authors
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] Error handling implemented

### For Reviewers
- [ ] Code is readable and maintainable
- [ ] Logic is correct
- [ ] Performance considerations
- [ ] Security implications
- [ ] Test coverage adequate
- [ ] Documentation sufficient

## 🎯 Project Structure

```
src/
├── components/       # Reusable components
├── pages/           # Page components
├── hooks/           # Custom hooks
├── utils/           # Utility functions
├── services/        # API services
├── store/           # Redux store
├── styles/          # Global styles
└── types/           # TypeScript types
```

## 🤝 Community

### Communication
- GitHub Issues for bugs and features
- GitHub Discussions for questions
- Code reviews for collaboration

### Code of Conduct
- Be respectful and inclusive
- Help others learn and grow
- Focus on constructive feedback
- Maintain professional communication

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to MobileUurka! 🚀