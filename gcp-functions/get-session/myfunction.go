package myfunction

import (
	"fmt"
	"net/http"
)

func GetSession(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "GetSession - CI/CD pipeline succeeded")
}