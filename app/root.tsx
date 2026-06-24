import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "About, Help & Docs | OpenRockets" },
    { name: "description", content: "Documentation and help for OpenRockets" },
  ];
};

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/png", href: "/favicon.png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center mt-12 mb-12">
        <iframe 
          src="https://www.dinogame.dev/embed?theme=classic&embed=true&showThemeSelector=false&autoStart=true&showInstructions=false" 
          width="100%" 
          height="300"
          frameBorder="0" 
          scrolling="no" 
          allowFullScreen
          title="Chrome Dino Game"
          style={{ border: 'none', maxWidth: '800px' }}
          className="mx-auto mb-6"
        ></iframe>
        <h1 className="text-3xl font-bold mb-2 tracking-tight">{message}</h1>
        <p className="text-lg font-medium max-w-lg mb-6">{details}</p>
        
        {stack && (
          <pre className="w-full max-w-3xl p-4 overflow-x-auto bg-gray-100 text-left text-sm border border-black mb-8">
            <code>{stack}</code>
          </pre>
        )}
      </main>
      <Footer />
    </div>
  );
}
