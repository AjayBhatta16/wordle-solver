package myfunction

import (
	"fmt"
	"net/http"
)

func GetNextWord(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "GetNextWord - CI/CD pipeline succeeded")
}