export type DocMeta = {
  category: string;
  slug: string;
  title: string;
  content: string;
};

export async function getAllDocs(): Promise<DocMeta[]> {
  // @ts-ignore
  const modules = import.meta.glob('../../documents/**/*.md', { query: '?raw', import: 'default' });
  
  const docs: DocMeta[] = [];
  
  for (const path in modules) {
    const rawContent = (await modules[path]()) as string;
    
    // Parse custom format: [category-name]
    const categoryMatch = rawContent.match(/^\[(.*?)\]/m);
    const titleMatch = rawContent.match(/^#\s+(.*)/m);
    
    const category = categoryMatch ? categoryMatch[1].trim() : 'uncategorized';
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled Document';
    
    const filename = path.split('/').pop()?.replace('.md', '') || '';
    const slug = filename.toLowerCase() === 'readme' 
      ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-') 
      : filename;
      
    docs.push({ category, slug, title, content: rawContent });
  }
  
  return docs;
}

export async function getDocBySlug(category: string, slug: string): Promise<DocMeta | null> {
  const docs = await getAllDocs();
  return docs.find(d => d.category === category && d.slug === slug) || null;
}
