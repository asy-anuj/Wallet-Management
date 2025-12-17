# Smart Wallet – Expense & Budget Manager

A modern wallet management dashboard designed and built by **Anuj Kumar**.  
The goal of this project is to track,daily budget, expenses, and saving goals with a clean UI using only HTML, CSS, and JavaScript (no backend).

---

## 🔍 Overview

Smart Wallet is a single‑page front‑end project:

- Dark **gradient theme** with glassmorphism cards  
- Responsive three‑column dashboard layout  
- Pure **HTML + CSS + Vanilla JavaScript** (no frameworks)  
- In‑memory JSON state that stores:
  - User information
  - Wallet details
  - Daily budget configuration
  - Expense list
  - Monthly reports
  - Smart features (AI suggestions, badges, alerts)

You can simply open `index.html` in a browser to run the project.

---

## 👤 Author – Anuj Kumar

This project is created for the GitHub portfolio of **Anuj Kumar**.

Key points about the author:

- Background: IT / Software with interest in DBMS and Oracle technologies  
- Learning focus:
  - Front‑end UI design with modern dark theme
  - Basic state management in JavaScript
  - Applying programming skills to a personal finance use case  
- Typical usage:
  - Portfolio project to show on GitHub
  - College / course assignment
  - Demo project to discuss in interviews

---

## ✨ Features

### 1. Wallet Overview

- Shows **initial balance**, **current balance**, and **total saved**  
- Displays wallet meta‑data: “Main Monthly Wallet”, type = Digital, currency = INR  
- Status badge for the wallet: `ACTIVE`  
- Data is read from `state.wallet` and `state.reports.monthlySummary` in `app.js`.

### 2. Daily Budget

- Daily spending limit is derived from monthly income and number of days  
- Shows **today’s remaining budget** (for example: ₹120 / ₹666)  
- Animated progress bar updates based on how much of today’s budget is used  
- When usage crosses the warning threshold (`smartFeatures.alerts.warningAt`, e.g. 80%),  
  the status message switches to a warning state.

### 3. Expense Tracking

- “Add Expense” modal with:
  - Amount
  - Category
  - Note  
- On submit:
  - A new expense object is pushed into `state.expenses`  
  - `totalSpent` increases  
  - `currentBalance` decreases  
  - `todayRemaining` is updated  
- The **Recent Expenses** section always shows the latest entries with category, note, amount, and date.

### 4. Reports & Category‑wise Spending

- Uses `reports.categoryWiseSpending` to display spending per category  
- For each category the UI shows:
  - Amount spent
  - Percentage of total monthly spending  
- This part can easily be extended later with charts or graphs.

### 5. Saving Goal

- Uses `smartFeatures.savingGoal` for:
  - Target amount (for example ₹3,000)
  - Remaining days
  - Adjusted daily limit (for example ₹550)  
- Progress bar is calculated from `totalSaved / targetAmount`  
- The label displays the completion percentage (for example “40% completed”).

### 6. Smart Features & Gamification

- **AI‑style suggestions** from `smartFeatures.aiSuggestions`, such as:
  - You spend more on Food during weekends.
  - Reduce Travel expenses by 10% to save money.  
- **Badges** from `smartFeatures.gamification.badgesEarned`, for example:
  - “7 Days Under Budget”
  - “No Spend Day”  

These features make the dashboard feel more personal and motivating.

---

## 🧱 Tech Stack

- **HTML5** – layout and structure of the dashboard  
- **CSS3** – dark gradient theme, glass cards, responsive grid layout  
- **JavaScript (ES6)** – state object, DOM rendering functions, and form handling  

No external JavaScript frameworks are used so that the code stays lightweight and easy to read.

---

## 🗂 Data Model (from a DBMS perspective)

All sample data lives inside the `state` object in `app.js`:

state.user // user info (id, name: Anuj Kumar, email, createdAt)
state.wallet // wallet details (walletId, name, type, currency, balances, status)
state.dailyBudget // monthlyIncome, daysInMonth, dailyLimit, todayRemaining, flags
state.expenses // [{ expenseId, date, amount, category, note, walletId }, ...]
state.reports // monthlySummary + categoryWiseSpending + expenseHeatmap
state.smartFeatures// savingGoal, alerts, aiSuggestions, gamification

text

This structure can be mapped to tables such as:

- **USER(user_id, name, email, created_at, wallet_pin_enabled)**  
- **WALLET(wallet_id, user_id, name, type, currency, initial_balance, current_balance, status)**  
- **EXPENSE(expense_id, wallet_id, date, amount, category, note)**  
- **REPORT_SUMMARY(month, total_income, total_spent, total_saved, highest_category)**  
- **SAVING_GOAL(goal_id, wallet_id, target_amount, remaining_days, adjusted_daily_limit)**  

This mapping shows how the front‑end JSON could later be backed by a real database.

---

## 🧠 Code Flow

1. The `state` object in `app.js` is initialised with all wallet, budget and report data.  
2. On `DOMContentLoaded`, the `init()` function runs.  
3. `init()` calls these render functions:
   - `renderHeaderUser()`
   - `renderWallet()`
   - `renderDailyBudget()`
   - `renderExpenses()`
   - `renderCategories()`
   - `renderSavingGoal()`
   - `renderSuggestions()`
   - `renderBadges()`  
4. Each function reads from `state` and updates specific DOM elements.  
5. The **Add Expense** form is handled by `handleExpenseFormSubmit()`:
   - Creates a new expense object from form input  
   - Pushes it into `state.expenses`  
   - Updates balances and budget values  
   - Re‑renders the relevant sections (wallet, daily budget, expenses, categories)

This gives a simple example of state management on the front‑end without any framework.

---

## 🚀 How to Run the Project

1. Clone or download the repository:

git clone https://github.com/asy-anuj/Wallet-Management.git

text

2. Open the project folder.  
3. Open `index.html` in any modern browser  
(for example double‑click the file or use the VS Code “Live Server” extension).  
4. Interact with the dashboard:
- Check the current balance, daily budget, category‑wise spending and saving goal  
- Use **Add Expense** to create a few expenses  
- Watch the balance, daily budget bar and recent expenses update in real time

---

## 🔮 Possible Future Enhancements

Some ideas to extend this project:

- Backend APIs using Node.js / Express with a real database  
- Authentication and multiple wallets per user  
- Charts for weekly and monthly spending trends  
- Export of reports to CSV / PDF  
- Real AI‑based suggestions using analytics or machine learning

---

## 📌 Author

**Anuj Kumar**  
Smart Wallet – Expense & Budget Manager  
Front‑end UI, JSON data modelling and JavaScript logic have been written specifically for this portfolio project.

