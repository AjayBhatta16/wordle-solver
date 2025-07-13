package myfunction

type Session struct {
	SessionId            string            `json:"sessionId" firestore:"sessionId"`
	LastUpdatedTimeStamp int64             `json:"lastUpdatedTimeStamp" firestore:"lastUpdatedTimeStamp"`
	LastGuessFeedback    string            `json:"lastGuessFeedback" firestore:"lastGuessFeedback"`
	GuessSequence        []string          `json:"guessSequence" firestore:"guessSequence"`
	Correct              CorrectLetters    `json:"correct" firestore:"correct"`
	Misplaced            []MisplacedLetter `json:"misplaced" firestore:"misplaced"`
	Incorrect            []IncorrectLetter `json:"incorrect" firestore:"incorrect"`
	NotWords             []string          `json:"notWords" firestore:"notWords"`
	firestoreID          string
}

type CorrectLetters struct {
	Ch_1 string `json:"ch_1"`
	Ch_2 string `json:"ch_2"`
	Ch_3 string `json:"ch_3"`
	Ch_4 string `json:"ch_4"`
	Ch_5 string `json:"ch_5"`
}

type MisplacedLetter struct {
	Value     string `json:"value"`
	Pos       int    `json:"pos"`
	Duplicate bool   `json:"duplicate"`
}

type IncorrectLetter struct {
	Value     string `json:"value"`
	Duplicate bool   `json:"duplicate"`
}
