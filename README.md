# Habit Tracker

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)

## Introduction

Habit Tracker is a powerful application designed to help users build and maintain habits. The application supports tracking habits on a daily and weekly basis, calculates streaks, and provides insights into habit completion over time.

## Features

- **Daily Habit Tracking**: Track habits that need to be completed every day. The app calculates streaks and tracks progress.
- **Weekly Habit Tracking**: Track habits that need to be completed a certain number of times per week.
- **Streak Calculation**: Automatically calculates and updates streaks based on habit completion.
- **Flexible Habit Management**: Create and update customizable frequency.
- **Completion History**: View the history of habit completions, including missed days.

## Installation

#### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
-  [Firebase Account](https://firebase.google.com/) (for authentication, database, and storage)

#### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/mdtalha109/habit_tracker
   ```
2. Navigate to the directory:
   ```bash
   cd habit_tracker
   ```
3. Install dependencies:
   ```bash
   cd habit_tracker
   ```
3. Setup firebase:
   
   - Create a new project in the [Firebase console](https://firebase.google.com/) 
   - Add a web app to your Firebase project and copy the Firebase configuration
   - Create a .env file in the root directory of your project and add your Firebase configuration as below:
   
      ```bash
      VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
      VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
      VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
      VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
      VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
      VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
     ```
 3. Start the application:
       ```bash
       npm run dev
       ```