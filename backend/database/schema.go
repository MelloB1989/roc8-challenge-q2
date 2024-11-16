package database

import "time"

type ResponseHTTP struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

type Users struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Data struct {
	Rid      string    `json:"rid"`
	Date     time.Time `json:"timestamp"`
	Age      int       `json:"age"`    // 0 for 15-25 and 1 for >25, assuming age is in this range
	Gender   int       `json:"gender"` // 0 for female and 1 for male
	FeatureA int       `json:"feature_a"`
	FeatureB int       `json:"feature_b"`
	FeatureC int       `json:"feature_c"`
	FeatureD int       `json:"feature_d"`
	FeatureE int       `json:"feature_e"`
	FeatureF int       `json:"feature_f"`
}

type Views struct {
	Vid       string `json:"vid"`
	Filters   string `json:"filters" db:"json"`
	CreatedAt string `json:"created_at"`
	CreatedBy string `json:"created_by"`
}
