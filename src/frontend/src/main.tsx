import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

// ─── Error Boundary ──────────────────────────────────────────────────────────
// Catches any render-time JS errors so they show a visible message instead of
// a blank white screen.

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    const message = error instanceof Error ? error.message : String(error);
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error("[ErrorBoundary] Caught render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "24px",
            fontFamily: "sans-serif",
            background: "#f0fdf4",
            color: "#14532d",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🕌</div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Something went wrong. Please reload.
          </h2>
          <p
            style={{ fontSize: "14px", color: "#166534", marginBottom: "24px" }}
          >
            कुछ गलत हो गया। कृपया पेज को रीलोड करें।
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Reload / रीलोड
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Bootstrap ───────────────────────────────────────────────────────────────

const queryClient = new QueryClient();

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element #root not found in DOM");
  }

  ReactDOM.createRoot(rootElement).render(
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <InternetIdentityProvider>
          <App />
        </InternetIdentityProvider>
      </QueryClientProvider>
    </ErrorBoundary>,
  );
} catch (err) {
  console.error("[main] Fatal render error:", err);
  // Last-resort inline fallback if ReactDOM.createRoot itself fails
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;
                  min-height:100vh;padding:24px;font-family:sans-serif;
                  background:#f0fdf4;color:#14532d;text-align:center;">
        <div style="font-size:48px;margin-bottom:16px">🕌</div>
        <h2 style="font-size:20px;font-weight:bold;margin-bottom:8px">
          Something went wrong. Please reload.
        </h2>
        <p style="font-size:14px;color:#166534;margin-bottom:24px">
          कुछ गलत हो गया। कृपया पेज को रीलोड करें।
        </p>
        <button onclick="window.location.reload()"
          style="background:#16a34a;color:white;border:none;border-radius:8px;
                 padding:12px 24px;font-size:16px;cursor:pointer;">
          Reload / रीलोड
        </button>
      </div>`;
  }
}
