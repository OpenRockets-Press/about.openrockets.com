import { Form, redirect, useActionData, useNavigation } from "react-router";
import type { Route } from "./+types/create";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;
  const email = formData.get("email") as string;
  
  if (!email || !email.endsWith("@openrockets.com")) {
    return { error: "Access denied: Only @openrockets.com emails are allowed." };
  }
  
  if (!category || !content) {
    return { error: "Category and content are required." };
  }
  
  // Extract title to generate slug
  const titleMatch = content.match(/^#\s+(.*)/m);
  const title = titleMatch ? titleMatch[1].trim() : 'untitled';
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || "OpenRockets";
  const repo = process.env.GITHUB_REPO || "about.openrockets.com";
  
  if (!token) {
    return { error: "Server error: GITHUB_TOKEN is not configured in the environment." };
  }
  
  const filePath = `documents/${slug}.md`;
  const fileContent = `[${category}]\n${content}`;
  
  try {
    // Check if file exists to get SHA (required for updating, but we assume creating new for now)
    // If it's a creation, we just PUT without SHA
    const encodedContent = btoa(unescape(encodeURIComponent(fileContent)));
    
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "OpenRockets-Docs"
      },
      body: JSON.stringify({
        message: `Create ${slug}.md via docs editor`,
        content: encodedContent,
        branch: "main"
      })
    });
    
    if (!response.ok) {
      const errData = await response.json();
      return { error: `GitHub API error: ${errData.message}` };
    }
    
    return redirect(`/docs/${category}/${slug}`);
  } catch (err: any) {
    return { error: `Failed to save documentation: ${err.message}` };
  }
}

export default function Create() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Header />
      <main className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create Documentation</h1>
          
          {actionData?.error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-200">
              {actionData.error}
            </div>
          )}

          <Form method="post" className="flex flex-col gap-6 bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-200">
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-2">
              <h3 className="font-semibold text-blue-800 mb-1">OpenRockets Single Sign-On</h3>
              <p className="text-sm text-blue-600">Access is restricted to authorized contributors.</p>
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">OpenRockets Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="your.name@openrockets.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500 bg-white"
                  required
                />
              </div>
            </div>

            <hr className="border-gray-200" />

            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <p className="text-xs text-gray-500 mb-2">The section in the sidebar where this will appear (e.g. <code>openrockets-press</code>)</p>
              <input 
                type="text" 
                name="category"
                placeholder="e.g. openrockets-press"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Markdown Content</label>
              <p className="text-xs text-gray-500 mb-2">
                Use Markdown formatting. <strong className="text-red-500">Important:</strong> The first line must be an H1 headline (`# Title`) which will be used as the page name.
              </p>
              <textarea 
                name="content"
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-md font-mono text-sm shadow-sm outline-none focus:border-blue-500 leading-relaxed"
                placeholder="# Introduction to the new project&#10;&#10;Write your documentation here..."
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-md hover:bg-blue-700 w-full md:w-auto self-end disabled:opacity-50 shadow-sm transition-colors"
            >
              {isSubmitting ? "Publishing to GitHub..." : "Publish Documentation"}
            </button>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
