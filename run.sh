screen -X -S "ci" stuff "^C"
screen -X -S "ci" quit
screen -A -m -d -S ci npm start