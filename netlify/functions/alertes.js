export default async (req, context) => {
  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const DATABASE_ID = process.env.NOTION_DATABASE_ID;

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        page_size: 10
      })
    });

    const data = await response.json();

    const debug = (data.results || []).map((page) => {
      const props = page.properties || {};
      const propertyNames = Object.keys(props);

      const extracted = {};
      for (const [key, value] of Object.entries(props)) {
        extracted[key] = {
          type: value.type,
          title: value.title?.[0]?.plain_text || "",
          rich_text: value.rich_text?.[0]?.plain_text || "",
          select: value.select?.name || "",
          date: value.date?.start || ""
        };
      }

      return {
        id: page.id,
        propertyNames,
        extracted
      };
    });

    return new Response(JSON.stringify({
      count: (data.results || []).length,
      debug
    }, null, 2), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erreur Netlify Function", details: String(error) }, null, 2), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
};
