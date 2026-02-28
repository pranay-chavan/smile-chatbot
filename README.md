# 😊 Smile Chatbot

https://smile-chatbot.vercel.app

A full-stack AI chatbot built with React, powered by Meta's Llama 3.1 via Hugging Face, with Firebase authentication and deployed on Vercel.

---

## ✨ Features

- 🤖 AI responses powered by Llama 3.1 via Hugging Face
- 🔐 Login with Google, GitHub, Email/Password or Phone
- 🌙 Dark and Light mode toggle
- 💬 Real-time typing indicator
- 🚀 Deployed on Vercel

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| AI | Hugging Face Inference API |
| Auth | Firebase Authentication |
| Routing | React Router DOM |
| Deployment | Vercel |

---

## 🚀 Getting Started

**1. Clone the repo**

```bash
git clone https://github.com/pranay-chavan/smile-chatbot.git
cd smile-chatbot
```

**2. Install dependencies**

```bash
npm install
```

**3. Create a `.env` file at the root and add your keys**

```env
VITE_HF_TOKEN=your_huggingface_token
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GITHUB_CLIENT_ID=your_github_client_id
```

**4. Start the dev server**

```bash
npm run dev
```

---

## 🔑 Getting Your API Keys

**Hugging Face**
- Sign up at huggingface.co
- Go to Settings → Access Tokens
- Create a token with Inference API permission enabled

**Firebase**
- Create a project at console.firebase.google.com
- Enable Authentication and turn on Google, GitHub, Email/Password and Phone
- Add your domain under Authentication → Settings → Authorized Domains

**GitHub OAuth**
- Go to GitHub → Settings → Developer Settings → OAuth Apps
- Set the callback URL to your Firebase auth handler URL

---

## 📦 Deploying to Vercel

1. Push your code to GitHub
2. Import the repo on vercel.com
3. Add all your env variables under Settings → Environment Variables
4. Hit Deploy

---

## 📄 License

MIT

---

## 📁 Project Structure

**src/components** — Reusable UI components

| File | Purpose |
|------|---------|
| ChatBox.jsx | Main chat layout, message list and scroll |
| Message.jsx | Individual chat bubble (user and AI) |
| InputBox.jsx | Text input with auto resize and send button |
| Footer.jsx | Social links footer |
| ProtectedRoute.jsx | Blocks unauthenticated users from chat page |

**src/pages** — App pages

| File | Purpose |
|------|---------|
| Home.jsx | Main chat page with AI integration |
| Login.jsx | Login with Google, GitHub, Email or Phone |
| Signup.jsx | Register with email and password |

**src/context** — Global state

| File | Purpose |
|------|---------|
| AuthContext.jsx | Stores logged in user, loading state and logout function |

**Root files**

| File | Purpose |
|------|---------|
| firebase.js | Firebase app init and auth providers |
| App.jsx | Routes and auth protection setup |
| App.css | Global CSS variables and base styles |
| vite.config.js | Vite config with Hugging Face API proxy |
| vercel.json | Fixes page refresh 404 on Vercel |
