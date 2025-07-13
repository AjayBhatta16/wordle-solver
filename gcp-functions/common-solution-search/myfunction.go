package myfunction

import (
	"encoding/json"
	"net/http"

	_ "embed"
)

//go:embed common-solutions.json
var commonSolutionsJSON []byte

func CommonSolutionSearch(w http.ResponseWriter, r *http.Request) {
	commonSolutions := GetCommonSolutions()

	var searchResult CommonSolution

	for _, sol := range commonSolutions {
		if sol.SolutionKey == r.URL.Query().Get("key") {
			searchResult = sol
			break
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(searchResult)
}

func GetCommonSolutions() []CommonSolution {
	var solutions []CommonSolution
	json.Unmarshal(commonSolutionsJSON, &solutions)

	return solutions
}
