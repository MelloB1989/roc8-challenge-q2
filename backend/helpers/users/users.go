package users

import (
	"fmt"
	"roc8/database"
	"roc8/utils"
)

func CreateUser(user *database.Users) error {
	db, err := database.DBConn()
	if err != nil {
		fmt.Println("Error connecting to database")
		return err
	}
	defer db.Close()
	user.Id = utils.GenerateID()
	err = database.InsertStruct(db, "users", user)
	if err != nil {
		fmt.Println("Error inserting user", err)
		return err
	}
	return nil
}

func GetUserByEmail(email string) (*database.Users, error) {
	db, err := database.DBConn()
	if err != nil {
		fmt.Println("Error connecting to database")
		return nil, err
	}
	defer db.Close()
	rows, err := db.Query("SELECT * FROM users WHERE email = $1", email)
	if err != nil {
		fmt.Println("Error querying database")
		return nil, err
	}
	user := []*database.Users{}
	if err := database.ParseRows(rows, &user); err != nil {
		fmt.Println("Error parsing rows")
		return nil, err
	}
	return user[0], nil
}

func GetUserByUID(uid string) (*database.Users, error) {
	db, err := database.DBConn()
	if err != nil {
		fmt.Println("Error connecting to database")
		return nil, err
	}
	defer db.Close()
	rows, err := db.Query("SELECT * FROM users WHERE id = $1", uid)
	if err != nil {
		fmt.Println("Error querying database")
		return nil, err
	}
	user := []*database.Users{}
	if err := database.ParseRows(rows, &user); err != nil {
		fmt.Println("Error parsing rows")
		return nil, err
	}
	return user[0], nil
}
