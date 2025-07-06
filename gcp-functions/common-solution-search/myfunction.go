package myfunction

import (
	"fmt"
	"net/http"
)

func CommonSolutionSearch(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "CommonSolutionSearch")
}