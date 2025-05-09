push a file from dir to git
  git add payload.json
  git commit -m "Add payload.json"
  git push origin main

copy files from git to a dir
  git clone https://github.com/khssadri/wildix-webhook

Database:
  psql postgresql://webhookdb_sf4t_user:bCqgvvTmP3uDeIl0lpYKZlWXvGT4qIzv@dpg-d0crsdgdl3ps73eggt8g-a.frankfurt-postgres.render.com/webhookdb_sf4t
  select * from processed_events;
