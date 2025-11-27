# Hosting Guide for CrimeNet

This guide explains how to host your CrimeNet application for free using **Vercel** (Frontend) and **Render** (Backend & Database).

## Prerequisites

1.  **GitHub Account**: Ensure your project is pushed to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
3.  **Render Account**: Sign up at [render.com](https://render.com).

---

## Part 1: Database & Backend (Render)

We will deploy the backend first because the frontend needs the backend URL.

### 1. Create a Database
**Why PostgreSQL?**
You are currently using SQLite locally (`crimenet.db`). However, free hosting platforms like Render are "ephemeral", meaning they delete your files (including your SQLite database) every time the app restarts. To keep your data safe, we must use a cloud database like PostgreSQL. Your code already supports this!

1.  Log in to **Render Dashboard**.
2.  Click **New +** and select **PostgreSQL**.
3.  Name it `crimenet-db`.
4.  Region: Choose one close to you (e.g., Frankfurt or Ohio).
5.  Plan: Select **Free**.
6.  Click **Create Database**.
7.  Wait for it to be created. Copy the **Internal Database URL** (for backend) and **External Database URL** (if you want to connect from your computer).

### 2. Deploy Backend Web Service
1.  On Render Dashboard, click **New +** and select **Web Service**.
2.  Connect your GitHub repository.
3.  **Name**: `crimenet-api` (or similar).
4.  **Root Directory**: `backend` (Important! This tells Render where the python app is).
5.  **Runtime**: `Python 3`.
6.  **Build Command**: `pip install -r requirements.txt`
7.  **Start Command**: `uvicorn app:app --host 0.0.0.0 --port $PORT`
8.  **Plan**: Select **Free**.
9.  **Environment Variables** (Advanced section):
    *   Key: `DATABASE_URL`
    *   Value: Paste the **Internal Database URL** from step 1.
    *   Key: `PYTHON_VERSION`
    *   Value: `3.9.0` (or `3.10.0`, helps avoid version mismatches).
10. Click **Create Web Service**.

Wait for the deployment to finish. Once live, copy the **Service URL** (e.g., `https://crimenet-api.onrender.com`).

### 3. Seed Your Database (Optional)
Since this is a fresh database, it will be empty. You can run your seed script to add initial data.
1.  In the Render Dashboard, go to your **Web Service** -> **Shell**.
2.  Run this command:
    ```bash
    python seed_crimes.py
    ```
3.  It should say "Seeded X crime points".

---

## Part 2: Frontend (Vercel)

Now we deploy the Next.js frontend and connect it to the backend.

1.  Log in to **Vercel Dashboard**.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Framework Preset**: It should auto-detect **Next.js**.
5.  **Root Directory**: Click `Edit` and select `frontend`.
6.  **Environment Variables**:
    *   Key: `NEXT_PUBLIC_API_URL`
    *   Value: Paste your **Render Backend Service URL** (from Part 1). **IMPORTANT**: Remove any trailing slash `/` (e.g., `https://crimenet-api.onrender.com`).
7.  Click **Deploy**.

### Final Step: Update Backend CORS
Once Vercel finishes, you will get a domain (e.g., `https://crimenet.vercel.app`).

1.  Go back to your **Render Dashboard** -> **Web Service** -> **Environment**.
2.  Add a new variable:
    *   Key: `FRONTEND_URL`
    *   Value: Your Vercel URL (e.g., `https://crimenet.vercel.app`).
3.  Save changes. Render will auto-redeploy.

---

## Summary of Free Tier Limits
*   **Render Web Service**: Spins down after 15 minutes of inactivity. The first request might take 30-50 seconds to load.
*   **Render Database**: The free database expires after 30 days. For a permanent free database, consider using **Neon.tech** or **Supabase** and just using their connection string in the `DATABASE_URL` variable on Render.
