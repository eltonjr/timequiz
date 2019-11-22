package main

import (
	"log"
	"net/http"
	"time"

	"github.com/julienschmidt/httprouter"
)

func main() {
	InitEnv()

	r := httprouter.New()

	r.GET("/v1/scores", GetScores)
	r.POST("/v1/scores", SaveScore)

	log.Printf("Server is running at %s", Env.Server.Address)
	if err := http.ListenAndServe(Env.Server.Address, middleware(r)); err != nil {
		log.Fatalf("ListenAndServe: %v", err)
	}
}

// WrapperResponseWriter is needed because http.ResponseWriter
// does not expose the returned status code.
// To log the returned status code, a new implementation of the
// ResponseWriter interface is needed to override the WriteHeader
// method and store the status code.
type wrapperRW struct {
	http.ResponseWriter
	status int
}

func (w *wrapperRW) WriteHeader(status int) {
	w.status = status
}

func middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t1 := time.Now()
		ww := wrapperRW{ResponseWriter: w}
		next.ServeHTTP(&ww, r)
		t2 := time.Now()
		log.Printf("%s %s - %d %v", r.Method, r.URL, ww.status, t2.Sub(t1))
	})
}
