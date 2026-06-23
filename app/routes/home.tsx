import { redirect } from "react-router";

export default function Home() {
  return null;
}

export async function loader() {
  // Redirect to the first available documentation page (e.g. docs/openrockets-press/introduction)
  return redirect("/docs/openrockets-press/introduction");
}
