// Base data model (taken from your JSON)
const state = {
  app: {},
  ui: {
    theme: "dark-gradient",
    primaryColor: "#6C63FF",
    secondaryColor: "#00E5FF",
    background: "linear-gradient(135deg, #1e1e2f, #2a2a40)"
  },
  user: {
    userId: "USR1001",
    name: "Anuj Kumar",
    email: "anuj@example.com",
    walletPinEnabled: true,
    createdAt: "2025-01-01"
  },
  wallet: {
    walletId: "WLT5001",
    walletName: "Main Monthly Wallet",
    walletType: "Digital",
    currency: "INR",
    initialBalance: 20000,
    currentBalance: 12500,
    status: "ACTIVE"
  },
  dailyBudget: {
    monthlyIncome: 20000,
    daysInMonth: 30,
    dailyLimit: 666,
    carryForwardEnabled: true,
    overspendAdjustment: true,
    todayRemaining: 120,
    lastUpdated: "2025-01-17"
  },
  expenses: [
    {
      expenseId: "EXP101",
      date: "2025-01-17",
      amount: 150,
      category: "Food",
      note: "Lunch with friends",
      walletId: "WLT5001"
    },
    {
      expenseId: "EXP102",
      date: "2025-01-17",
      amount: 80,
      category: "Travel",
      note: "Auto fare",
      walletId: "WLT5001"
    }
  ],
  reports: {
    monthlySummary: {
      totalIncome: 20000,
      totalSpent: 7500,
      totalSaved: 12500,
      highestSpendingCategory: "Food"
    },
    categoryWiseSpending: {
      Food: 3200,
      Travel: 1800,
      Entertainment: 1500,
      Others: 1000
    },
    expenseHeatmap: {
      "2025-01-10": 300,
      "2025-01-11": 900,
      "2025-01-12": 100,
      "2025-01-13": 700
    }
  },
  smartFeatures: {
    savingGoal: {
      enabled: true,
      targetAmount: 3000,
      remainingDays: 13,
      adjustedDailyLimit: 550
    },
    alerts: {
      warningAt: 80,
      limitExceeded: true,
      message: "⚠️ You have reached 80% of today's budget"
    },
    aiSuggestions: [
      "You spend more on Food during weekends",
      "Try reducing Travel expenses by 10% to save ₹500"
    ],
    gamification: {
      badgesEarned: ["7 Days Under Budget", "No Spend Day"]
    }
  }
};

// Utility
const formatCurrency = (amount) =>
  `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

// ----- INITIAL RENDER -----
function init() {
  try {
    renderHeaderUser();
    renderWallet();
    renderDailyBudget();
    renderExpenses();
    renderCategories();
    renderSavingGoal();
    renderSuggestions();
    renderBadges();
  } catch (err) {
    console.error("Error while rendering dashboard:", err);
  }
}

// Header: user name
function renderHeaderUser() {
  const userNameEls = document.querySelectorAll(".user-name");
  userNameEls.forEach((el) => (el.textContent = state.user.name || "Anuj Kumar"));
}

// Wallet card
function renderWallet() {
  const { wallet, reports } = state;

  const balanceEl = document.getElementById("currentBalance");
  if (balanceEl) balanceEl.textContent = wallet.currentBalance.toLocaleString("en-IN");

  const metricEls = {
    initial: document.querySelector(".metric-initial"),
    spent: document.querySelector(".metric-spent"),
    saved: document.querySelector(".metric-saved")
  };

  if (metricEls.initial)
    metricEls.initial.textContent = formatCurrency(wallet.initialBalance);
  if (metricEls.spent)
    metricEls.spent.textContent = formatCurrency(reports.monthlySummary.totalSpent);
  if (metricEls.saved)
    metricEls.saved.textContent = formatCurrency(reports.monthlySummary.totalSaved);
}

// Daily budget
function renderDailyBudget() {
  const { dailyBudget, reports } = state;
  const remainingEl = document.getElementById("todayRemaining");
  const progressEl = document.getElementById("budgetProgress");
  const statusEl = document.getElementById("budgetStatus");

  if (remainingEl) remainingEl.textContent = dailyBudget.todayRemaining;

  const spentToday =
    dailyBudget.dailyLimit - dailyBudget.todayRemaining > 0
      ? dailyBudget.dailyLimit - dailyBudget.todayRemaining
      : 0;
  const percent = Math.min(
    100,
    Math.round((spentToday / dailyBudget.dailyLimit) * 100)
  );

  if (progressEl) {
    progressEl.style.width = `${percent}%`;
  }

  if (statusEl) {
    const textSpan = statusEl.querySelector(".status-text");
    const iconSpan = statusEl.querySelector(".status-icon");
    if (percent >= state.smartFeatures.alerts.warningAt) {
      if (iconSpan) iconSpan.textContent = "⚠️";
      if (textSpan) textSpan.textContent = "Close to limit";
      statusEl.style.color = "#ffb74d";
    } else {
      if (iconSpan) iconSpan.textContent = "✅";
      if (textSpan) textSpan.textContent = "Within budget";
      statusEl.style.color = "#00e676";
    }
  }

  const incomeLabel = document.getElementById("incomeLabel");
  const daysLabel = document.getElementById("daysLabel");
  if (incomeLabel)
    incomeLabel.textContent = `Income: ${formatCurrency(
      reports.monthlySummary.totalIncome
    )}`;
  if (daysLabel) daysLabel.textContent = `Days: ${dailyBudget.daysInMonth}`;
}

// Recent expenses
function renderExpenses() {
  const container = document.getElementById("expensesList");
  if (!container) return;

  container.innerHTML = "";

  if (!state.expenses || state.expenses.length === 0) {
    container.innerHTML =
      '<div class="list-item"><span class="list-subtitle">No expenses added yet.</span></div>';
    return;
  }

  const recent = [...state.expenses].slice(-5).reverse();

  recent.forEach((exp) => {
    const row = document.createElement("div");
    row.className = "list-item";

    row.innerHTML = `
      <div class="list-main">
        <span class="list-title">${exp.category}</span>
        <span class="list-subtitle">${exp.note || "No note"}</span>
      </div>
      <div class="list-meta">
        <span class="amount-text">${formatCurrency(exp.amount)}</span>
        <span class="amount-small">${exp.date}</span>
      </div>
    `;

    container.appendChild(row);
  });
}

// Category spending
function renderCategories() {
  const container = document.getElementById("categoryList");
  if (!container) return;

  container.innerHTML = "";

  const map = state.reports.categoryWiseSpending || {};
  const entries = Object.entries(map);

  if (entries.length === 0) {
    container.innerHTML =
      '<div class="list-item"><span class="list-subtitle">No category data.</span></div>';
    return;
  }

  const total = entries.reduce((sum, [, val]) => sum + val, 0);

  entries.forEach(([cat, amt]) => {
    const percent = total > 0 ? Math.round((amt / total) * 100) : 0;

    const row = document.createElement("div");
    row.className = "list-item";

    row.innerHTML = `
      <div class="list-main">
        <span class="list-title">${cat}</span>
        <span class="list-subtitle">${percent}% of this month</span>
      </div>
      <div class="list-meta">
        <span class="amount-text">${formatCurrency(amt)}</span>
      </div>
    `;

    container.appendChild(row);
  });
}

// Saving goal
function renderSavingGoal() {
  const { savingGoal } = state.smartFeatures;
  const bar = document.getElementById("goalProgress");
  const label = document.getElementById("goalProgressText");
  if (!bar || !label) return;

  const saved = state.reports.monthlySummary.totalSaved;
  const percent = Math.max(
    0,
    Math.min(100, Math.round((saved / savingGoal.targetAmount) * 100))
  );

  bar.style.width = `${percent}%`;
  label.textContent = `${percent}% completed`;
}

// Suggestions
function renderSuggestions() {
  const list = document.getElementById("suggestionsList");
  if (!list) return;

  list.innerHTML = "";

  const suggestions = state.smartFeatures.aiSuggestions || [];
  if (suggestions.length === 0) {
    list.innerHTML =
      '<div class="list-item"><span class="list-subtitle">No suggestions yet.</span></div>';
    return;
  }

  suggestions.forEach((text) => {
    const row = document.createElement("div");
    row.className = "list-item";
    row.innerHTML = `
      <div class="list-main">
        <span class="list-title">Smart tip</span>
        <span class="list-subtitle">${text}</span>
      </div>
    `;
    list.appendChild(row);
  });
}

// Badges / Gamification
function renderBadges() {
  const container = document.getElementById("badgesList");
  if (!container) return;

  container.innerHTML = "";

  const badges = state.smartFeatures.gamification.badgesEarned || [];
  if (badges.length === 0) {
    container.innerHTML =
      '<span class="list-subtitle">Earn badges by staying under budget.</span>';
    return;
  }

  badges.forEach((b) => {
    const span = document.createElement("span");
    span.className = "badge-pill";
    span.textContent = b;
    container.appendChild(span);
  });
}

// ----- Quick action handlers -----
function openExpenseModal() {
  const modal = document.getElementById("expenseModal");
  if (modal) modal.classList.add("open");
}

function closeExpenseModal() {
  const modal = document.getElementById("expenseModal");
  if (modal) modal.classList.remove("open");
}

function viewReports() {
  alert("Demo: Reports page will show detailed charts and heatmaps.");
}

function setGoal() {
  alert("Demo: Goal settings will allow changing target amount and days.");
}

function viewHistory() {
  alert("Demo: Full expense history table will be shown.");
}

function viewAllExpenses() {
  viewHistory();
}

// Add expense form submit
function handleExpenseFormSubmit(event) {
  event.preventDefault();
  const amountInput = document.getElementById("expenseAmount");
  const categoryInput = document.getElementById("expenseCategory");
  const noteInput = document.getElementById("expenseNote");

  const amount = Number(amountInput.value);
  const category = categoryInput.value;
  const note = noteInput.value.trim();

  if (!amount || !category) return;

  const newExpense = {
    expenseId: "EXP" + (state.expenses.length + 101),
    date: new Date().toISOString().slice(0, 10),
    amount,
    category,
    note: note || "No note",
    walletId: state.wallet.walletId
  };

  state.expenses.push(newExpense);
  state.reports.monthlySummary.totalSpent += amount;
  state.wallet.currentBalance -= amount;

  // Update UI
  renderWallet();
  renderExpenses();
  renderCategories();

  // Budget update (simple)
  state.dailyBudget.todayRemaining = Math.max(
    0,
    state.dailyBudget.todayRemaining - amount
  );
  renderDailyBudget();

  // Reset form + close modal
  amountInput.value = "";
  categoryInput.value = "";
  noteInput.value = "";
  closeExpenseModal();
}

// Attach listeners
window.addEventListener("DOMContentLoaded", () => {
  init();

  const form = document.getElementById("expenseForm");
  if (form) {
    form.addEventListener("submit", handleExpenseFormSubmit);
  }
});

// Expose for inline handlers
window.openExpenseModal = openExpenseModal;
window.closeExpenseModal = closeExpenseModal;
window.viewReports = viewReports;
window.setGoal = setGoal;
window.viewHistory = viewHistory;
window.viewAllExpenses = viewAllExpenses;
