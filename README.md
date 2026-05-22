# SayaraHub Web 🚗

SayaraHub is a web-based car marketplace platform designed to help users browse, search, and explore vehicles through a clean and modern interface.

This is the **frontend application only**. Backend services will be integrated in future updates.

---


## 🛠️ Tech Stack

- React.js
- TypeScript
- Vite
- Material UI
- HTML5 / CSS3
- Context API
- Axios / Fetch API
- REST API integration (ready for backend connection)

---

## ✨ Features

- Modern and responsive UI design
- Car listing and browsing interface
- Search and filter functionality
- Clean and reusable component structure
- API-ready architecture for backend integration
- Mobile-responsive design
- Frontend-only offline/demo mode for testing without backend

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Install and Run

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```text
sayarahub-web/
├─ src/
│  ├─ components/
│  │  ├─ car/
│  │  ├─ common/
│  │  ├─ filters/
│  │  ├─ layout/
│  │  └─ sections/
│  ├─ constants/
│  ├─ contexts/
│  ├─ hooks/
│  ├─ modules/
│  │  └─ auth/
│  ├─ pages/
│  ├─ services/
│  ├─ types/
│  ├─ utils/
│  ├─ App.tsx
│  └─ main.tsx
├─ public/
├─ index.html
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

---

## 🔌 Backend Integration Notes

- API service layer is under `src/services/`
- Auth context is under `src/modules/auth/AuthContext.tsx`
- Current setup supports frontend testing without active backend
- Backend endpoints can be connected later through the existing service methods
