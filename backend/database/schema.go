package database

type Users struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Data struct {
	Rid      string `json:"rid"`
	Date     string `json:"date"`
	Age      int    `json:"age"`
	Gender   int    `json:"gender"`
	FeatureA int    `json:"feature_a"`
	FeatureB int    `json:"feature_b"`
	FeatureC int    `json:"feature_c"`
	FeatureD int    `json:"feature_d"`
	FeatureE int    `json:"feature_e"`
	FeatureF int    `json:"feature_f"`
}

type Views struct {
	Vid       string `json:"vid"`
	Filters   string `json:"filters" db:"json"`
	CreatedAt string `json:"created_at"`
	CreatedBy string `json:"created_by"`
}
