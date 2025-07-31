# Google Calendar Integration Setup - Simple OAuth2 Method

This guide provides a simple way to connect Google Calendar integration for the Surge mentors booking system using OAuth2.

## 🚀 Quick Setup (5 minutes)

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

### 2. Create OAuth2 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Fill in the details:
   - **Name**: `TBDC Calendar Integration`
   - **Authorized JavaScript origins**: `http://localhost:3000` (for development)
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/google/callback`
5. Click "Create"
6. **Save the Client ID and Client Secret** - you'll need these

### 3. Environment Variables

Create a `.env.local` file in your project root:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
GOOGLE_CALENDAR_ORGANIZER_EMAIL=abid@tbdc.com
```

### 4. Test the Integration

1. Start your development server: `npm run dev`
2. Go to the Surge dashboard
3. Try to book a mentor session
4. You'll be prompted to connect your Google Calendar
5. Authorize the application
6. Your booking will automatically create a calendar event with Google Meet!

## 🔧 How It Works

1. **User books a session** → System prompts for Google Calendar connection
2. **User authorizes** → OAuth2 flow handles authentication
3. **Calendar event created** → Automatic Google Meet link generated
4. **Invitations sent** → Both mentor and mentee receive calendar invites

## ✨ Features

- **One-click connection** - No complex setup required
- **Automatic Google Meet** - Every session gets a video call link
- **Email invitations** - Both parties receive calendar invites
- **Reminders** - Automatic email and popup reminders
- **Secure** - Uses OAuth2 for secure authentication

## 🛠️ Technical Implementation

The system uses:
- **OAuth2 flow** for user authentication
- **Google Calendar API** for event creation
- **Google Meet API** for video call links
- **Server-side token storage** for persistent access

## 🔒 Security

- Uses OAuth2 for secure authentication
- Tokens are stored securely on the server
- No sensitive credentials in client-side code
- Users control their own calendar access

## 🚨 Troubleshooting

### Step 1: Test Your Configuration

Visit this URL to check if your setup is correct:
```
http://localhost:3000/api/auth/google/test
```

This will tell you exactly what's missing from your configuration.

### Step 2: Common Issues & Solutions

#### ❌ "Client ID not configured"
**Solution:**
1. Check your `.env.local` file has the correct `GOOGLE_CLIENT_ID`
2. Make sure you copied the Client ID (not Client Secret) from Google Cloud Console
3. Restart your development server after adding environment variables

#### ❌ "Authorization failed"
**Solution:**
1. Make sure your redirect URI matches exactly: `http://localhost:3000/api/auth/google/callback`
2. Check that the OAuth2 client is configured for web application (not desktop)
3. Verify your authorized JavaScript origins includes `http://localhost:3000`

#### ❌ "Calendar access denied"
**Solution:**
1. User needs to grant calendar permissions during OAuth flow
2. Check that Google Calendar API is enabled in your Google Cloud project
3. Make sure you're using the correct Google account

#### ❌ "Event creation failed"
**Solution:**
1. Verify the user has a Google Calendar
2. Check that the organizer email is valid
3. Ensure the user granted all required permissions

#### ❌ "Invalid redirect URI"
**Solution:**
1. In Google Cloud Console, go to your OAuth2 credentials
2. Add exactly this redirect URI: `http://localhost:3000/api/auth/google/callback`
3. Make sure there are no extra spaces or characters

#### ❌ "Google Calendar API not enabled"
**Solution:**
1. Go to Google Cloud Console
2. Navigate to "APIs & Services" > "Library"
3. Search for "Google Calendar API"
4. Click "Enable"

### Step 3: Environment Variables Checklist

Make sure your `.env.local` file has these exact variables:

```env
# Required - Get these from Google Cloud Console
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Optional - Defaults to abid@tbdc.com
GOOGLE_CALENDAR_ORGANIZER_EMAIL=abid@tbdc.com
```

### Step 4: Google Cloud Console Checklist

1. ✅ **Project created** and selected
2. ✅ **Google Calendar API** enabled
3. ✅ **OAuth consent screen** configured
4. ✅ **OAuth2 credentials** created (Web application)
5. ✅ **Authorized JavaScript origins** includes `http://localhost:3000`
6. ✅ **Authorized redirect URIs** includes `http://localhost:3000/api/auth/google/callback`

### Step 5: Debug Steps

1. **Check configuration**: Visit `http://localhost:3000/api/auth/google/test`
2. **Check browser console**: Look for any JavaScript errors
3. **Check server console**: Look for backend error messages
4. **Check network tab**: See if the OAuth request is being made
5. **Try incognito mode**: Sometimes browser extensions interfere

### Step 6: Common Mistakes

- **Wrong credential type**: Using service account instead of OAuth2
- **Wrong redirect URI**: Missing `/callback` or using wrong port
- **Environment variables not loaded**: Forgetting to restart the dev server
- **Wrong scopes**: Not requesting calendar permissions
- **Browser cache**: Old OAuth tokens interfering

## 📝 Production Setup

For production, update your OAuth2 credentials:

1. **Authorized JavaScript origins**: Add your production domain
2. **Authorized redirect URIs**: Add your production callback URL
3. **Environment variables**: Update with production URLs

## 🎯 Benefits of This Approach

- **Simple setup** - No service accounts or complex permissions
- **User control** - Users connect their own calendars
- **No maintenance** - No need to manage service account keys
- **Scalable** - Works for any number of users
- **Secure** - Industry-standard OAuth2 authentication

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Ensure Google Calendar API is enabled
4. Check that OAuth2 credentials are properly configured
5. Use the test endpoint to diagnose configuration issues

---

**That's it!** This approach is much simpler than service accounts and gives users direct control over their calendar integration. 