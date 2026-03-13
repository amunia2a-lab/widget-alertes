export default async function handler(req,res){
try{
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  await fetch("https://api.notion.com/v1/pages",{
    method:"POST",
    headers:{
      "Authorization":`Bearer ${process.env.NOTION_API_KEY}`,
      "Notion-Version":"2022-06-28",
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      parent:{database_id:process.env.NOTION_DATABASE_ID},
      properties:{
        Alerte:{title:[{text:{content:body.alerte}}]},
        Véhicule:{rich_text:[{text:{content:body.vehicule}}]},
        Priorité:{select:{name:body.priorite}},
        Statut:{select:{name:"En cours"}},
        Date:{date:{start:new Date().toISOString().slice(0,10)}}
      }
    })
  });

  res.status(200).json({ok:true});
}catch(error){
  res.status(500).json({error:String(error)});
}
}
