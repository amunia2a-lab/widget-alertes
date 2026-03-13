
export default async (req, context) => {

const NOTION_API_KEY = process.env.NOTION_API_KEY
const DATABASE_ID = process.env.NOTION_DATABASE_ID

const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`,{
method:"POST",
headers:{
"Authorization":`Bearer ${NOTION_API_KEY}`,
"Notion-Version":"2022-06-28",
"Content-Type":"application/json"
}
})

const data = await response.json()

const results = (data.results || []).map(page=>{

const props = page.properties || {}

const alerte =
props["Alerte"]?.title?.[0]?.plain_text ||
""

const vehicule =
props["Véhicule"]?.rich_text?.[0]?.plain_text ||
""

const priorite = props["Priorité"]?.select?.name || ""
const statut = props["Statut"]?.select?.name || ""
const date = props["Date"]?.date?.start || ""

return {id:page.id,alerte,vehicule,priorite,statut,date}

})

const filtered = results.filter(r => r.statut !== "Réglé")

return new Response(JSON.stringify(filtered),{
headers:{"Content-Type":"application/json"},
status:200
})

}
