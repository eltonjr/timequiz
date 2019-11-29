package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
	"sort"
	"strconv"
)

type Score struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Score int    `json:"score"`
	Time  int    `json:"time"`
}

const (
	COLUMN_NAME = iota
	COLUMN_EMAIL
	COLUMN_SCORE
	COLUMN_TIME
)

func saveScore(score *Score) error {

	file, err := os.OpenFile(Env.DB.FilePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return fmt.Errorf("fails attempting open DB file: %s", err)
	}

	scoreStr := strconv.Itoa(score.Score)
	timeStr := strconv.Itoa(score.Time)

	content := [][]string{
		{score.Name, score.Email, scoreStr, timeStr},
	}

	writer := csv.NewWriter(file)
	defer writer.Flush()

	err = writer.WriteAll(content)
	if err != nil {
		return fmt.Errorf("fails attempting write content: %s", err)
	}

	return nil
}

func getScores() ([]Score, error) {
	file, err := os.OpenFile(Env.DB.FilePath, os.O_RDONLY, os.ModePerm)
	if err != nil {
		return nil, fmt.Errorf("fails attempting open DB file: %s", err)
	}

	reader := csv.NewReader(file)
	var records []Score

	for {
		line, err := reader.Read()
		if err == io.EOF {
			break
		} else if err != nil {
			return nil, fmt.Errorf("fails attempting read csv line: %s", err)
		}

		score, err := strconv.Atoi(line[COLUMN_SCORE])
		if err != nil {
			log.Printf("fails converting score to int: %s", err)
		}

		time, err := strconv.Atoi(line[COLUMN_TIME])
		if err != nil {
			log.Printf("fails converting score to int: %s", err)
		}

		records = append(records, Score{
			Name:  line[COLUMN_NAME],
			Email: line[COLUMN_EMAIL],
			Score: score,
			Time:  time,
		})
	}

	sort.SliceStable(records, func(i, j int) bool {
		if records[i].Score == records[j].Score {
			return records[i].Time < records[j].Time
		}
		return records[i].Score > records[j].Score
	})

	return records, nil
}
