# Outfitly-API

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Database Structure](#database-structure)
4. [Getting Started](#getting-started)
5. [Prerequisites](#prerequisites)
6. [Installation](#installation)
7. [Usage](#usage)

---

## Project Overview
**Outfitly** is a comprehensive API designed to manage outfits, events, and scheduling for users. Users can organize outfits, associate them with events, and create custom schedules. The platform supports relationship tracking between outfits, events, and user suggestions.

## Features
- User management and authentication.
- Event and week management.
- Outfit management with image support.
- Schedule outfits to specific days.
- Track and manage outfit suggestions for events.
- CRUD operations on relationships between items, events, outfits, and suggestions.

## Database Structure
Outfitly's database consists of 11 tables that store data for users, outfits, events, and relationships. Here’s an overview:

1. **Users** - Stores user information and authentication data.
2. **Events** - Details about events that users can attend.
3. **Weeks** - Weekly structure to help with event and outfit scheduling.
4. **Items** - Individual clothing items that make up outfits.
5. **Outfits** - Groups of items creating complete outfits.
6. **Outfit Suggestions** - Outfit suggestions related to user events.
7. **Schedule** - Links outfits to specific days for planning.
8. **Attends** - Tracks user attendance at events.
9. **Associated With** - Links items to events.
10. **Contains** - Links items to outfits.
11. **Related To** - Relates outfit suggestions to events.

---

## Getting Started
Follow these instructions to set up and run the Outfitly project locally.

### Prerequisites
- **Node.js** and **npm**: Make sure you have Node.js (v14 or later) and npm installed.
- **MySQL**: A MySQL server instance for database management.
- **Git**: To clone and manage the repository.

### Installation
1. **Clone the repository**:
    ```bash
    git clone https://github.com/MateoBitar/OUTFITLY-API
    cd outfitly
    ```

2. **Install dependencies**:
    The project relies on several key packages. To install them, run:

    ```bash
    npm install
    ```
    **dotenv**,
    **express**,
    **express-validator**,
    **moment**,
    **mysql2**,
    **nodemon**,
    **sharp**

3. **Set up environment variables**:
    - Create a `.env` file in the root directory.
    - Add the following configurations:
      ```plaintext
      DB_HOST=your_db_host
      DB_USER=your_db_user
      DB_PASSWORD=your_db_password
      DB_NAME=your_db_name
      PORT=your_preferred_port
      ```

4. **Initialize the Database**:
   Use the database schema file provided (if available) to create tables and initialize your MySQL database.

### Usage
To start the server, run:
```bash
npm run dev
