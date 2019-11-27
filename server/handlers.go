package main

import (
	"encoding/json"
	"fmt"
	"github.com/julienschmidt/httprouter"
	"log"
	"net/http"
)

func GetScores(w http.ResponseWriter, _ *http.Request, _ httprouter.Params) {
	scores, err := getScores()
	if err != nil {
		log.Printf(err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	by, err := json.Marshal(scores)
	if err != nil {
		log.Printf("fails attempting marshal scores: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "%s", by)
}

func SaveScore(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	var s Score
	err := json.NewDecoder(r.Body).Decode(&s)
	if err != nil {
		log.Printf("fails attempting decode request body: %s", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = saveScore(&s)
	if err != nil {
		log.Println(err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
}