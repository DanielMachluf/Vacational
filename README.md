# Vacational - Vacation Management System

### 🔗 Live Links
- **Production Site:** [https://vacational.web.app](https://vacational.web.app)
- **GitHub Repository:** [https://github.com/DanielMachluf/Vacational](https://github.com/DanielMachluf/Vacational)

## 🐳 Docker Deployment Guide

This project is fully containerized using Docker, allowing you to spin up the entire stack (MySQL, Node.js Backend, and React Frontend) with a single command.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### 🚀 Getting Started

1. **Environment Variables:**
   Ensure you have a `.env` file in the root directory with the following variables (refer to `.env.example` if available):
   ```env
   MYSQL_ROOT_PASSWORD=your_password
   MYSQL_PASSWORD=your_password
   JWT_SECRET=your_secret
   HASH_SALT=your_salt
   CHAT_GPT_API_KEY=your_openai_key
   ```

2. **Launch the Stack:**
   Run the following command in the root folder to build and start all services in detached mode:
   ```bash
   docker compose up -d --build
   ```

3. **Check Status:**
   Verify that all three containers are healthy:
   ```bash
   docker compose ps
   ```

4. **Access the Application:**
   - **Frontend:** [http://localhost](http://localhost) (Port 80)
   - **Backend API:** [http://localhost:4000](http://localhost:4000)
   - **Database:** Port 3306

### 🛑 Stopping the Application

To stop and remove the containers while keeping your data in volumes:
```bash
docker compose stop
```

To completely remove the containers and the internal network:
```bash
docker compose down
```

To remove everything, including the database volumes (reset data):
```bash
docker compose down -v
```

---

## Features

- **Authentication & Authorization**: Secure JWT-based login/registration with role-based access control (User/Admin).
- **Vacation Board**: View, filter (Active, Future, Liked), and paginate through beautiful vacation cards.
- **Like System**: Users can like/unlike vacations, preventing duplicates.
- **Admin Dashboard**: Manage (Add/Edit/Delete) vacations with modern image upload previews. Ensure strict form validation (dates, price limits).
- **Analytics & Reports**: Visual BarChart reporting likes per destination, plus CSV export functionality.
- **AI Integration**:
  - *Ask AI*: A travel assistant to recommend destinations.
  - *Ask MCP*: Database-aware analytics agent that converts conversational questions into SQL insights.

## Project Structure

This workspace is divided into three main components:
1. `Database/` - Contains the MySQL schema initialization scripts/dumps.
2. `Backend/` - Node.js Express server handling the REST API, JWT auth, file uploads, and MCP AI routes. 
3. `Frontend/` - Vite-powered React application with fully responsive components, modern routing, and Recharts.

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite, React Router, React Hook Form, Axios, Recharts, Notyf.
- **Backend**: Node.js, Express, TypeScript, MySQL2, JSONWebToken, Express FileUpload, Uploaded File Saver, Model Context Protocol SDK.
- **Database**: MySQL.

## Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL Server
- Optional: OpenAI API Key (for AI/MCP features)

### 1. Database Setup
1. Create a database named `vacations_db`.
2. Import the provided SQL dump from the `Database/` folder.
3. Update `Backend/src/2-utils/app-config.ts` with your MySQL credentials.

### 2. Backend Setup
```bash
cd Backend
npm install
npm start
```
*The backend runs on `http://localhost:4000` by default.*

### 3. Frontend Setup
```bash
cd Frontend
npm install
npm start
```
*The frontend runs on `http://localhost:5173` by default.*

## Roles

- **User**: Can browse vacations, use filters, toggle likes on/off, ask the AI for recommendations, and query the Database via MCP.
- **Admin**: Can access the hidden Admin Dashboard, manage the vacation inventory (add/edit/delete), view the visual reports chart, and download analytics as CSV. Admins do not have the ability to explicitly 'like' vacations.