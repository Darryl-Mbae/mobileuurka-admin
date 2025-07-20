# MobileUurka Admin System - Deployment Guide

This guide covers deploying the MobileUurka Admin System to various platforms.

## 🚀 Quick Deploy

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Netlify
```bash
# Build the project
npm run build

# Deploy dist/ folder to Netlify
```

## 🔧 Environment Setup

### Required Environment Variables
```env
VITE_SERVER_URL=https://your-api-domain.com
VITE_SOCKET_URL=https://your-socket-domain.com
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### Platform-Specific Setup

#### Vercel
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

#### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Set environment variables in Netlify dashboard

#### AWS S3 + CloudFront
```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 🔒 Security Checklist

- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] CORS configured for production domains
- [ ] reCAPTCHA keys updated
- [ ] API endpoints secured
- [ ] Socket.io authentication enabled

## 📊 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist/

# Optimize images
# Ensure images in public/ are optimized
```

### CDN Configuration
- Enable gzip compression
- Set proper cache headers
- Use CDN for static assets

## 🔍 Monitoring

### Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for usage tracking

### Performance Monitoring
- Lighthouse CI for performance checks
- Web Vitals monitoring
- Real User Monitoring (RUM)

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Check platform-specific variable setup
- Verify variable names match exactly

#### Socket Connection Issues
- Check CORS configuration
- Verify Socket.io URL is correct
- Ensure WebSocket support is enabled

### Health Checks
```bash
# Test build locally
npm run build
npm run preview

# Check bundle size
npm run build -- --analyze
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Build successful locally
- [ ] Environment variables configured
- [ ] Security review completed
- [ ] Performance optimized

### Post-Deployment
- [ ] Application loads correctly
- [ ] Authentication working
- [ ] Real-time features functional
- [ ] All pages accessible
- [ ] Mobile responsiveness verified
- [ ] Error tracking configured

## 🔄 CI/CD Pipeline

### GitHub Actions (Included)
The repository includes a GitHub Actions workflow that:
1. Runs tests on pull requests
2. Builds the application
3. Deploys to production on main branch

### Manual Deployment
```bash
# 1. Test locally
npm run dev

# 2. Run tests
npm run test

# 3. Build for production
npm run build

# 4. Deploy
vercel --prod
# or
netlify deploy --prod --dir=dist
```

## 🌍 Multi-Environment Setup

### Development
```env
VITE_SERVER_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
VITE_RECAPTCHA_SITE_KEY=dev_key
```

### Staging
```env
VITE_SERVER_URL=https://staging-api.mobileuurka.com
VITE_SOCKET_URL=https://staging-api.mobileuurka.com
VITE_RECAPTCHA_SITE_KEY=staging_key
```

### Production
```env
VITE_SERVER_URL=https://api.mobileuurka.com
VITE_SOCKET_URL=https://api.mobileuurka.com
VITE_RECAPTCHA_SITE_KEY=production_key
```

## 📱 Mobile Considerations

### PWA Setup (Optional)
```bash
# Add PWA support
npm install vite-plugin-pwa
```

### Mobile Testing
- Test on actual devices
- Verify touch interactions
- Check responsive breakpoints
- Test offline functionality

## 🔧 Advanced Configuration

### Custom Domain
1. Configure DNS records
2. Set up SSL certificate
3. Update CORS settings
4. Test all functionality

### Load Balancing
For high-traffic deployments:
- Use multiple server instances
- Configure load balancer
- Set up health checks
- Monitor performance

## 📞 Support

For deployment issues:
1. Check this guide first
2. Review platform documentation
3. Create GitHub issue
4. Contact development team

---

Happy deploying! 🚀