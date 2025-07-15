# Deployment Guide

## Current Status ✅

- **API**: Successfully deployed at https://hyphae-ftndmad04-hyphae.vercel.app
- **Frontend**: Ready for deployment

## Deploy API

```bash
cd api
vercel --prod --public
```

## Deploy Frontend

```bash
cd frontend
npm run build
vercel --prod --public
```

## Verify Deployment

- Test API health: `https://your-api-url/health`
- View API docs: `https://your-api-url/docs`
- Test frontend functionality

## Environment Variables

None required for basic deployment. All endpoints work without external dependencies.

## Troubleshooting

- Use `--public` flag for Vercel deployments
- Check build logs if deployment fails
- Verify all dependencies are in requirements.txt/package.json
