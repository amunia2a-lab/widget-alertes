
export default async (req, context) => {

const NOTION_API_KEY = process.env.NOTION_API_KEY
const DATABASE_ID = process.env.NOTION_DATABASE_ID

const body = JSON.parse(req.body)

await fetch("https://api.notion.com/v1/pages",{
method:"POST",
headers:{
"Authorization":`Bearer ${NOTION_API_KEY}`,
"Notion-Version":"2022-06-28",
"Content-Type":"application/json"
},
body:JSON.stringify({
parent:{database_id:DATABASE_ID},
properties:{
Alerte:{title:[{text:{content:body.alerte}}]},
Véhicule:{rich_text:[{text:{content:body.vehicule}}]},
Priorité:{select:{name:body.priorite}},
Statut:{select:{name:"En cours"}}
}
})
})

return new Response(JSON.stringify({ok:true}),{status:200})

}
