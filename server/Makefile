include server.env
export

.DEFAULT_GOAL := help

IMAGE_NAME := timequiz-server
CONTAINER_NAME := timequiz-server

.PHONY: help
help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "Usage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

.PHONY: deps
deps: ## Install go dependencies based on go mod
	GO111MODULE=on go get -insecure ./...

.PHONY: build
build: ## Compiles the system's binary
	GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -v -a -installsuffix cgo -o server

.PHONY: run
run: ## Run the system locally
	go run main.go

.PHONY: test
test: ## Run unit tests
	CGO_ENABLED=0 go test -count=1 -v ./...

.PHONY: ops-build
ops-build: ## Compiles the system using docker
	docker build -t ${IMAGE_NAME} .

.PHONY: ops-run
ops-run: ## Runs the system using docker
	docker run -d --name ${CONTAINER_NAME} --env-file server.env --net host ${IMAGE_NAME}
