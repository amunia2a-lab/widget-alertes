export default async function handler(req,res){
try{
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  await fetch(`https://api.notion.com/v1/pages/${body.id}`,{
    method:"PATCH",
    headers:{
      "Authorization":`Bearer ${process.env.NOTION_API_KEY}`,
      "Notion-Version":"2022-06-28",
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      properties:{Statut:{select:{name:"Réglé"}}}
    })
  });

  res.status(200).json({ok:true});
}catch(error){
  res.status(500).json({error:String(error)});
}
}
