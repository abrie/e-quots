deploy: HEAD = $(shell git rev-parse --short HEAD)
deploy:
	# This step assumes that the 'gh-pages' pages branch is mounted as
	# a git worktree into a directory named 'gh-pages'
	@npx vue-cli-service build
	@(cd gh-pages && rm -rf *)
	@cp -R dist/ gh-pages
	@(cd gh-pages && git add . && git commit -m "Deploy $(HEAD)")
	@git push origin gh-pages

serve:
	npx vue-cli-service serve
