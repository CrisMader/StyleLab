import type { Snippet } from "../types";

export const snippets: Snippet[] = [
  {
    id: 1,
    title: "Gradient Button",
    description: "A modern button with gradient background and hover effect",
    category: "buttons",
    css_code: `.gradient-btn {
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
    html_code: `<button class="gradient-btn">Click me</button>`,
    author: "CrisMader",
    created_at: "2025-03-20"
  },
  {
    id: 2,
    title: "Card with Shadow",
    description: "A simple card component with shadow and padding",
    category: "cards",
    css_code: `.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  padding: 20px;
  color: white;
}`,
    html_code: `<div class="card">Card with Shadow</div>`,
    author: "CrisMader",
    created_at: "2025-03-20"

  },
  {
    id: 3,
    title: "Glassmorphism Card",
    description: "Frosted glass effect with blur and transparency",
    category: "cards",
    css_code: `.card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  color: white;
}`,
    html_code: `<div class="card">Glass Card</div>`,
    author: "CrisMader",
    created_at: "2025-03-20"
  },
  {
    id: 4,
    title: "Gradient Border Card",
    description: "Card with animated gradient border",
    category: "cards",
    css_code: `.card {
  padding: 20px;
  border-radius: 12px;
  background: #1e1e1e;
  color: white;
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 2px;
  background: linear-gradient(45deg, #00f5a0, #00d9f5);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
}`,
    html_code: `<div class="card">Gradient Border</div>`,
    author: "CrisMader",
    created_at: "2025-03-20"
  },
  {
    id: 5,
    title: "Hover Lift Card",
    description: "Card that lifts with shadow on hover",
    category: "cards",
    css_code: `.card {
  background: #2a2a2a;
  padding: 20px;
  border-radius: 12px;
  color: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.4);
}`,
    html_code: `<div class="card">Hover me</div>`,
    author: "CrisMader",
    created_at: "2025-03-20"
  },
  {
    id: 6,
    title: "Neumorphism Card",
    description: "Soft UI card with inner shadows",
    category: "cards",
    css_code: `.card {
  background: #2e2e2e;
  border-radius: 20px;
  padding: 20px;
  color: white;
  box-shadow: 8px 8px 16px #1f1f1f,
              -8px -8px 16px #3d3d3d;
}`,
    html_code: `<div class="card">Neumorphism</div>`,
    author: "CrisMader",
    created_at: "2025-03-20"
  },
  {
    id: 7,
    title: "Image Overlay Card",
    description: "Card with background image and dark overlay",
    category: "cards",
    css_code: `.card {
  position: relative;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  color: white;
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url('https://picsum.photos/300') center/cover;
}

.card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
}

.card span {
  position: relative;
  z-index: 2;
}`,
    html_code: `<div class="card"><span>Overlay Card</span></div>`,
    author: "CrisMader",
    created_at: "2025-03-20"
  },
  {
    id: 8,
    title: "Minimal Clean Card",
    description: "Simple and clean card with subtle border",
    category: "cards",
    css_code: `.card {
  background: #111;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 20px;
  color: #eee;
}`,
    html_code: `<div class="card">Minimal Card</div>`,
    author: "CrisMader",
    created_at: "2025-03-20"
  },

  {
    id: 3,
    title: "Pulse Animation",
    description: "A smooth pulsing animation effect for attention-grabbing elements",
    category: "animations",
    css_code: `.pulse {
  width: 80px;
  height: 80px;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.7; }
}`,
    html_code: `<div class="pulse"></div>`,
    author: "CrisMader",
    created_at: "2025-03-22"
  },
  {
    id: 4,
    title: "Glassmorphism Card",
    description: "A frosted glass effect card with blur and transparency",
    category: "cards",
    css_code: `.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  color: white;
  width: 250px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}`,
    html_code: `<div class="glass-card">Frosted glass effect</div>`,
    author: "CrisMader",
    created_at: "2025-03-25"
  },
  {
    id: 5,
    title: "Underline Hover Link",
    description: "A link with animated underline that slides in on hover",
    category: "hover-effects",
    css_code: `.hover-link {
  position: relative;
  text-decoration: none;
  color: #3b82f6;
  font-size: 18px;
}
.hover-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background: #3b82f6;
  transition: width 0.3s ease;
}
.hover-link:hover::after {
  width: 100%;
}`,
    html_code: `<a class="hover-link" href="">Hover over me</a>`,
    author: "CrisMader",
    created_at: "2025-04-01"
  }
]