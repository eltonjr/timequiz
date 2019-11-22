package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func GetScores(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	//if r.URL.Query().Get("limit") == "" {
	//}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}

func SaveScore(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}
