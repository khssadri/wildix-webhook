
push a file from dir to git
 <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;git add payload.json
 <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;git commit -m "Add payload.json"
 <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;git push origin main

copy files from git to a dir
  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;git clone https://github.com/khssadri/wildix-webhook

Database:
  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;psql postgresql://webhookdb_sf4t_user:bCqgvvTmP3uDeIl0lpYKZlWXvGT4qIzv@dpg-d0crsdgdl3ps73eggt8g-a.frankfurt-postgres.render.com/webhookdb_sf4t
  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;select * from processed_events;
  
curl -X POST https://wildix-webhook.onrender.com/webhook/transcription \
  -H "Content-Type: application/json" \
  -d @payload.json
