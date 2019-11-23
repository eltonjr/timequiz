IMAGE_NAME := timequiz-web
CONTAINER_NAME := timequiz-web

.PHONY: help
help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "Usage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

.PHONY: deps
deps: ## Install node dependencies based on npm
	npm install --unsafe-perm

.PHONY: build
build: ## Compiles the system's dist
	npm run build

.PHONY: run
run: ## Run the system locally
	npm run dev

.PHONY: lint
lint: ## Check the system syntax
	npm run lint

.PHONY: ops-build
ops-build: ## Compiles the system using docker
	docker build -t ${IMAGE_NAME} .

.PHONY: ops-run
ops-run: ## Runs the system using docker
	docker run -d --name ${CONTAINER_NAME} --net host -e BACKEND_SERVICE_HOST=localhost -e BACKEND_SERVICE_PORT=9000 ${IMAGE_NAME}
