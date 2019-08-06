deploy:
	npx vue-cli-service build
	rsync -avp --delete dist/ docs
	git add -u docs; git add docs
	git commit -m "Deploy ${shell git rev-parse --short HEAD}"
	git push origin

serve:
	npx vue-cli-service serve
