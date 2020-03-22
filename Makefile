.PHONY: dev build push server

node_modules: package.json
	yarn

dev: node_modules
	yarn dev

build: node_modules
	yarn build

server: node_modules
	yarn server

push:
	git add .
	git commit -am "${commit}" -S
	git push -u origin master
