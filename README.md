# 💣 Bluemine

A modern, responsive Minesweeper game built using **HTML, CSS, and Vanilla JavaScript**.

Live Demo:  
👉 https://bluemine.netlify.app

---

## 🎮 About The Project

Bluemine is a fully functional browser-based Minesweeper game designed with a clean blue-themed UI and smooth animations.

This project implements real Minesweeper mechanics including:

- ✅ First-click safety logic
- ✅ Flood-fill (auto expansion of empty cells)
- ✅ Animated chain mine explosion
- ✅ Multiple difficulty levels (Easy / Medium / Hard)
- ✅ Responsive design (Mobile & Tablet supported)
- ✅ Smooth reveal animations
- ✅ Timer tracking

The goal is to clear the board without triggering a mine.

---

## 🧠 Core Logic Implemented

### 🔹 First Click Safety
Mines are generated **after the first click**, ensuring the first cell is never a mine.

### 🔹 Flood Fill Algorithm
If a cell has zero adjacent mines, surrounding cells are automatically revealed recursively.

### 🔹 Chain Explosion Effect
When a mine is triggered, all mines explode sequentially for a realistic game-over effect.

### 🔹 Dynamic Difficulty Scaling
- Easy → 9x9 grid (10 mines)
- Medium → 12x12 grid (20 mines)
- Hard → 16x16 grid (40 mines)

---

## 🛠 Tech Stack

- HTML5
- CSS3 (Flexbox + Grid)
- Vanilla JavaScript (No frameworks)

---

## 📱 Responsive Design

Bluemine adapts automatically to:

- Desktop
- Tablet
- Mobile devices

Cell sizes scale dynamically to prevent overflow on smaller screens.

---

## 🚀 Deployment

The project is deployed using **Netlify**.

Live URL:  
👉 https://bluemine.netlify.app

---
