import type { Snippet } from "../types";

export const snippets: Snippet[] = [
    {
        id: 1,
        title: "Gradient Button",
        description: "A modern button with gradient background and hover effect",
        category: "buttons",
        cssCode: `.gradient-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.3s;
}
.gradient-btn:hover {
  opacity: 0.85;
}`,
        htmlCode: `<button class="gradient-btn">Click me</button>`,
        author: "CrisMader",
        createdAt: "2025-03-20"
    },
    {
        id: 2,
        title: "Card with Shadow",
        description: "A simple card component with shadow and padding",
        category: "cards",
        cssCode: `.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}`,
        htmlCode: `<div class="card">Card with Shadow</div>`,
        author: "CrisMader",
        createdAt: "2025-03-20"

    }
]