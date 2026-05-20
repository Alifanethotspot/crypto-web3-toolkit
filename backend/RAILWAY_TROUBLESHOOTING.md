# Railway Deployment Troubleshooting

## Common Errors & Solutions

### Error 1: "Module not found" or Import Errors

**Cause:** Missing dependencies or incorrect Python path

**Solution:**
```bash
# Check requirements.txt includes all dependencies
pip freeze > requirements.txt

# Ensure all app modules have __init__.py
touch app/__init__.py
touch app/api/__init__.py
touch app/api/routes/__init__.py
```

### Error 2: "Port already in use" or Connection Refused

**Cause:** Not using Railway's PORT environment variable

**Solution:**
Update `main.py`:
```python
import os
port = int(os.environ.get("PORT", 8000))
uvicorn.run(app, host="0.0.0.0", port=port)
```

### Error 3: CORS Errors from Frontend

**Cause:** CORS not configured for production domains

**Solution:**
Update CORS middleware in `main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://*.netlify.app",
        "https://*.vercel.app",
        "*"  # Allow all for testing
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Error 4: Build Timeout

**Cause:** Large dependencies (torch, transformers) taking too long

**Solution:**
1. Remove unused heavy dependencies from requirements.txt
2. Use lighter alternatives:
   ```txt
   # Instead of torch==2.5.0 (2GB+)
   # Use CPU-only version or remove if not needed
   ```

### Error 5: Python Version Mismatch

**Cause:** Railway using different Python version

**Solution:**
Create `runtime.txt`:
```
3.11
```

### Error 6: Database Connection Failed

**Cause:** DATABASE_URL not set or incorrect format

**Solution:**
1. Add PostgreSQL service in Railway
2. Set environment variable:
   ```
   DATABASE_URL=postgresql://user:pass@host:5432/dbname
   ```

### Error 7: Redis Connection Failed

**Cause:** REDIS_URL not set

**Solution:**
1. Add Redis service in Railway
2. Set environment variable:
   ```
   REDIS_URL=redis://host:6379/0
   ```

### Error 8: "Application startup failed"

**Cause:** Error in route imports or initialization

**Solution:**
Check Railway logs for specific error:
```bash
railway logs
```

Common fixes:
- Ensure all route files exist
- Check for syntax errors
- Verify all imports are correct

## Railway Deployment Checklist

- [ ] `requirements.txt` includes all dependencies
- [ ] `Procfile` or `railway.json` configured
- [ ] `runtime.txt` specifies Python version
- [ ] All `__init__.py` files present
- [ ] Environment variables set in Railway dashboard
- [ ] CORS configured for production domains
- [ ] Health endpoint (`/health`) working
- [ ] Start command uses `$PORT` variable

## Testing Deployment

### 1. Local Test
```bash
cd backend
pip install -r requirements.txt
PORT=8000 uvicorn main:app --host 0.0.0.0 --port $PORT
curl http://localhost:8000/health
```

### 2. Railway Test
```bash
# After deployment
curl https://your-app.up.railway.app/health
curl https://your-app.up.railway.app/docs
```

### 3. CORS Test
```bash
curl -X OPTIONS https://your-app.up.railway.app/api/wallet/analyze \
  -H "Origin: https://your-frontend.netlify.app" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

## Environment Variables Required

```bash
# Required
PORT=8000  # Auto-set by Railway

# Optional (for full functionality)
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
SECRET_KEY=your-secret-key
MOCK_MODE=true  # Set false in production
```

## Railway Dashboard Settings

1. **Root Directory:** `backend`
2. **Build Command:** `pip install -r requirements.txt`
3. **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Health Check Path:** `/health`
5. **Auto-deploy:** Enabled (on push to main)

## Quick Fixes

### Fix 1: Redeploy
```bash
git commit --allow-empty -m "trigger redeploy"
git push origin main
```

### Fix 2: Check Logs
Railway Dashboard → Deployments → View Logs

### Fix 3: Restart Service
Railway Dashboard → Service → Restart

### Fix 4: Environment Variables
Railway Dashboard → Variables → Add/Update

## Success Indicators

✅ Build completes without errors  
✅ Health endpoint returns 200 OK  
✅ `/docs` shows API documentation  
✅ CORS preflight requests succeed  
✅ Railway logs show "Application startup complete"  
✅ No error messages in logs

## Contact Support

If issues persist:
1. Check Railway status: https://status.railway.app
2. Railway Discord: https://discord.gg/railway
3. Railway Docs: https://docs.railway.app
