deploy: HEAD = $(shell git rev-parse --short HEAD)
deploy:
	yarn deploy
serve:
	yarn serve
