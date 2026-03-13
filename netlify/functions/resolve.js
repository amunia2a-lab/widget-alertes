
export default async (req, context) => {

const NOTION_API_KEY = process.env.NOTION_API_KEY

const body = JSON.parse(req.body)

await fetch(`https://api.notion.com/v1/pages/${body.id}`,{
method:"PATCH",
headers:{
"Authorization":`Bearer ${NOTION_API_KEY}`,
"Notion-Version":"2022-06-28",
"Content-Type":"application/json"
},
body:JSON.stringify({
properties:{
Statut:{select:{name:"Réglé"}}
}
})
})

return new Response(JSON.stringify({ok:true}),{status:200})

}
