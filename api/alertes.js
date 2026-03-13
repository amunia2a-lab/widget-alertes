export default async function handler(req,res){

const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,{
method:"POST",
headers:{
"Authorization":`Bearer ${process.env.NOTION_API_KEY}`,
"Notion-Version":"2022-06-28",
"Content-Type":"application/json"
}
})

const data = await response.json()

const results=(data.results||[]).map(p=>{
const pr=p.properties||{}
return{
id:p.id,
alerte:pr["Alerte"]?.title?.[0]?.plain_text||"",
vehicule:pr["Véhicule"]?.rich_text?.[0]?.plain_text||"",
priorite:pr["Priorité"]?.select?.name||"",
statut:pr["Statut"]?.select?.name||"",
date:pr["Date"]?.date?.start||""
}
}).filter(r=>r.statut!=="Réglé")

res.status(200).json(results)

}
