package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"sort"
	"testing"
)

var scores = []Score{
	{"leonardo@mail.com", 5, 3000},
	{"donatello@mail.com", 3, 7000},
	{"michelangelo@mail.com", 10, 12000},
	{"raphael@mail.com", 2, 3000},
	{"splinter@mail.com", 10, 10000},
}

func TestHandlers(t *testing.T) {
	Env.DB.FilePath = "db_test.csv"

	t.Run("testSaveScores", testSaveScores)
	t.Run("testGetScores", testGetScores)

	os.Remove(Env.DB.FilePath)
}

func testSaveScores(t *testing.T) {
	res := httptest.NewRecorder()

	for _, s := range scores {
		body, err := json.Marshal(&s)
		if err != nil {
			fmt.Printf("fails marshaling request body: %s", err)
		}

		req := httptest.NewRequest(http.MethodPost, "/v1/scores", bytes.NewBuffer(body))

		SaveScore(res, req, nil)

		if res.Code != http.StatusCreated {
			t.Errorf("Expected status %d - found %d", http.StatusCreated, res.Code)
		}
	}
}

func testGetScores(t *testing.T) {
	res := httptest.NewRecorder()

	req := httptest.NewRequest(http.MethodGet, "/v1/scores", nil)

	GetScores(res, req, nil)

	if res.Code != http.StatusOK {
		t.Errorf("Expected status %d - found %d", http.StatusOK, res.Code)
	}

	var scores []Score
	err := json.NewDecoder(res.Body).Decode(&scores)
	if err != nil {
		t.Errorf("fails decoding response body: %s", err)
	}

	isSorted := sort.SliceIsSorted(scores, func(i, j int) bool {
		if scores[i].Score == scores[j].Score {
			return scores[i].Time < scores[j].Time
		}
		return scores[i].Score > scores[j].Score
	})

	if !isSorted {
		t.Errorf("scores should be a sorted array. Found: %+v", scores)
	}

}
