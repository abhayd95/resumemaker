# ⏰ Cron Jobs Documentation

## Overview

Resume Maker application uses cron jobs for automated maintenance tasks. These jobs run automatically in the background to keep the application optimized and clean.

## Available Cron Jobs

### 1. **Cleanup Old Resumes** 🧹
- **Schedule**: Daily at 2:00 AM (IST)
- **Purpose**: Deletes resumes older than 90 days that haven't been updated
- **Cron Expression**: `0 2 * * *`
- **What it does**: 
  - Removes resumes that are older than 90 days
  - Only deletes if both `created_at` and `updated_at` are older than 90 days

### 2. **Database Optimization** ⚡
- **Schedule**: Weekly on Sunday at 3:00 AM (IST)
- **Purpose**: Optimizes database tables for better performance
- **Cron Expression**: `0 3 * * 0`
- **What it does**:
  - Runs `OPTIMIZE TABLE` on the resumes table
  - Improves query performance
  - Reduces database fragmentation

### 3. **Daily Statistics** 📊
- **Schedule**: Daily at 1:00 AM (IST)
- **Purpose**: Collects and logs daily statistics
- **Cron Expression**: `0 1 * * *`
- **What it tracks**:
  - Total number of resumes
  - Resumes created today
  - Number of active users
  - Logs data to console

### 4. **Cleanup Duplicates** 🔄
- **Schedule**: Weekly on Monday at 4:00 AM (IST)
- **Purpose**: Removes duplicate resumes
- **Cron Expression**: `0 4 * * 1`
- **What it does**:
  - Finds resumes with same `user_name` and `resume_data`
  - Keeps the latest one (highest ID)
  - Deletes older duplicates

### 5. **Health Check** 💚
- **Schedule**: Every hour
- **Purpose**: Monitors database connection health
- **Cron Expression**: `0 * * * *`
- **What it does**:
  - Tests database connection
  - Logs health status
  - Helps identify connection issues early

## Configuration

### Enable/Disable Cron Jobs

In your `.env` file:

```env
# Enable cron jobs (default: enabled)
ENABLE_CRON_JOBS=true

# Disable cron jobs
ENABLE_CRON_JOBS=false
```

### Timezone

All cron jobs use `Asia/Kolkata` timezone. To change:

Edit `server/jobs/cronJobs.js` and update the `timezone` option in each cron job.

## API Endpoints

### Check Cron Jobs Status

```bash
GET /api/cron/status
```

Response:
```json
{
  "success": true,
  "cronJobs": {
    "cleanupOldResumes": {
      "running": true,
      "lastRun": "2024-12-08T20:30:00.000Z"
    },
    "optimizeDatabase": {
      "running": true,
      "lastRun": "2024-12-08T21:00:00.000Z"
    }
  },
  "timestamp": "2024-12-08T22:00:00.000Z"
}
```

### Health Check (includes cron status)

```bash
GET /api/health
```

## Customizing Cron Jobs

### Change Schedule

Edit `server/jobs/cronJobs.js`:

```javascript
// Example: Run cleanup every 6 hours
cleanupOldResumes: cron.schedule('0 */6 * * *', async () => {
  // ... job code
})
```

### Cron Expression Format

```
* * * * *
│ │ │ │ │
│ │ │ │ └─── Day of week (0-7, 0 or 7 is Sunday)
│ │ │ └───── Month (1-12)
│ │ └─────── Day of month (1-31)
│ └───────── Hour (0-23)
└─────────── Minute (0-59)
```

### Examples

- `0 2 * * *` - Every day at 2:00 AM
- `0 */6 * * *` - Every 6 hours
- `0 0 * * 0` - Every Sunday at midnight
- `*/30 * * * *` - Every 30 minutes
- `0 0 1 * *` - First day of every month at midnight

## Adding New Cron Jobs

1. Open `server/jobs/cronJobs.js`
2. Add a new cron job:

```javascript
// Your new cron job
yourNewJob: cron.schedule('0 5 * * *', async () => {
  try {
    // Your job logic here
    console.log('Your job executed')
  } catch (error) {
    console.error('Error in yourNewJob:', error.message)
  }
}, {
  scheduled: false,
  timezone: "Asia/Kolkata"
})
```

3. The job will automatically start when the server starts

## Monitoring

### View Logs

Cron jobs log their execution to the console. Check your server logs to see:

- ✅ Successful executions
- ❌ Errors and failures
- 📊 Statistics and metrics

### Example Log Output

```
⏰ Starting cron jobs...
✅ Started cron job: cleanupOldResumes
✅ Started cron job: optimizeDatabase
✅ Started cron job: dailyStats
✅ Started cron job: cleanupDuplicates
✅ Started cron job: healthCheck
🎯 All cron jobs are active

🧹 Cleanup: Deleted 5 old resumes
📊 Daily Statistics: { totalResumes: 150, todayResumes: 3, activeUsers: 25 }
💚 Health check: Database connection healthy
```

## Best Practices

1. **Test First**: Test cron jobs manually before scheduling
2. **Error Handling**: Always wrap cron job code in try-catch
3. **Logging**: Log important operations for debugging
4. **Performance**: Keep cron jobs lightweight
5. **Backup**: Consider backing up data before cleanup jobs
6. **Monitoring**: Monitor cron job execution regularly

## Troubleshooting

### Cron Jobs Not Running

1. Check if `ENABLE_CRON_JOBS` is set to `true` in `.env`
2. Check server logs for errors
3. Verify cron expressions are valid
4. Check timezone settings

### Database Errors

1. Ensure database connection is working
2. Check database permissions
3. Verify table structure matches expectations

### Performance Issues

1. Optimize cron job queries
2. Add indexes if needed
3. Consider running heavy jobs during off-peak hours

## Security Considerations

- Cron jobs run with server permissions
- Ensure database credentials are secure
- Don't expose sensitive operations in cron jobs
- Validate all data before deletion

---

**Note**: Cron jobs are designed to run automatically. Manual intervention is rarely needed, but you can monitor them via the API endpoints.

