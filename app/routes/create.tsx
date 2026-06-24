import { Form, redirect, useActionData, useNavigation, useLoaderData } from "react-router";
import type { Route } from "./+types/create";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MaterialInput } from "../components/MaterialInput";
import { getSessionUser } from "../utils/auth.server";

export async function loader({ request, context }: Route.LoaderArgs) {
  // @ts-ignore
  const env = context.cloudflare?.env || (typeof process !== "undefined" ? process.env : {});
  const user = await getSessionUser(request, env);
  
  if (!user || !user.email.endsWith("@openrockets.com")) {
    return { authenticated: false };
  }
  return { authenticated: true, user };
}

export async function action({ request, context }: Route.ActionArgs) {
  // @ts-ignore
  const env = context.cloudflare?.env || (typeof process !== "undefined" ? process.env : {});
  const user = await getSessionUser(request, env);
  
  if (!user || !user.email.endsWith("@openrockets.com")) {
    return { error: "Access denied: Only @openrockets.com authenticated users are allowed." };
  }

  const formData = await request.formData();
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;
  
  if (!category || !content) {
    return { error: "Category and content are required." };
  }
  
  // Extract title to generate slug
  const titleMatch = content.match(/^#\s+(.*)/m);
  const title = titleMatch ? titleMatch[1].trim() : 'untitled';
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const token = env.GITHUB_TOKEN;
  const owner = env.GITHUB_OWNER || "OpenRockets-Press";
  const repo = env.GITHUB_REPO || "about.openrockets.com";
  
  if (!token) {
    return { error: "Server error: GITHUB_TOKEN is not configured in the environment." };
  }
  
  const filePath = `documents/${slug}.md`;
  const fileContent = `[${category}]\n${content}`;
  
  try {
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
        branch: "main",
        committer: {
          name: user.name,
          email: user.email
        }
      })
    });
    
    if (!response.ok) {
      const errData = await response.json() as any;
      return { error: `GitHub API error: ${errData.message}` };
    }
    
    return redirect(`/docs/${category}/${slug}`);
  } catch (err: any) {
    return { error: `Failed to save documentation: ${err.message}` };
  }
}

export default function Create() {
  const { authenticated, user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white text-black font-sans">
      <Header />
      <main className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          
          {actionData?.error && (
            <div className="border border-black p-4 mb-6">
              <span className="font-bold">Error:</span> {actionData.error}
            </div>
          )}

          {!authenticated ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 border border-black p-10 bg-white">
              <h1 className="text-3xl font-bold">Writer Admin Access</h1>
              <p className="text-lg font-medium max-w-lg">
                Documentation publishing is restricted. You must be signed in with your `@openrockets.com` workspace account to create or edit articles.
              </p>
              <a 
                href={'https://accounts.openrockets.com/login?redirect_uri=' + encodeURIComponent('https://about.openrockets.com/auth/sso-callback?returnTo=/create')}
                className="bg-black text-white px-8 py-4 font-bold transition-transform hover:scale-105 active:scale-95 shadow-sm"
              >
                Sign in with OpenRockets
              </a>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Create Documentation</h1>
                <div className="flex items-center gap-3 text-sm font-bold border border-black px-4 py-2 bg-white">
                  {user?.avatar_url && (
                    <img src={user.avatar_url} alt="Profile" className="w-6 h-6 rounded-full border border-black" />
                  )}
                  <span>{user?.name}</span>
                </div>
              </div>

              <Form method="post" className="flex flex-col gap-6 bg-white p-6 md:p-8 border border-black">
                <div className="flex flex-col">
                  <MaterialInput 
                    type="text" 
                    name="category" 
                    label="Category (e.g. openrockets-press)" 
                    required 
                  />
                  <p className="text-xs text-black mt-2 font-medium">The section in the sidebar where this will appear.</p>
                </div>
                
                <div className="flex flex-col">
                  <MaterialInput 
                    name="content" 
                    label="Markdown Content (Must start with # Title)" 
                    required 
                    multiline 
                  />
                  <p className="text-xs text-black mt-2 font-medium">
                    Use Markdown formatting. The first line must be an H1 headline (`# Title`) which will be used as the page name.
                  </p>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-black text-white font-bold py-3 px-8 hover:opacity-80 w-full md:w-auto self-end disabled:opacity-50 transition-opacity"
                >
                  {isSubmitting ? "Publishing to GitHub..." : "Publish Documentation"}
                </button>
              </Form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
