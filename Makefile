deploy:
	HEAD=${shell git rev-parse --short HEAD}
	npx vue-cli-service build
	(cd gh-pages && rm -rf *)
	cp -R dist/ gh-pages
	(cd gh-pages && git commit -a -m "Deploy $(HEAD)")
	git push origin gh-pages

serve:
	npx vue-cli-service serve
