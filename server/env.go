package main

import (
	"log"
	"os"
)

type vars struct {
	Server struct {
		Address string
	}

	DB struct {
		FilePath string
	}
}

// Env holds custom variables needed for the system to work.
// When the system starts, a process checks every needed var
// and crashes if some is missing
var Env vars

func InitEnv() {
	Env.Server.Address = os.Getenv("SERVER_ADDRESS")
	if Env.Server.Address == "" {
		log.Fatal("missing SERVER_ADDRESS")
	}

	Env.DB.FilePath = os.Getenv("DB_FILEPATH")
	if Env.DB.FilePath == "" {
		log.Fatal("missing DB_FILEPATH")
	}
}
