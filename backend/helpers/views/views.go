package views

import (
	"fmt"
	"roc8/database"
	"roc8/utils"
)

func CreateView(view database.Views) error {
	db, err := database.DBConn()
	if err != nil {
		fmt.Println("Error connecting to database")
		return err
	}
	defer db.Close()
	view.Vid = utils.GenerateID()
	err = database.InsertStruct(db, "views", view)
	if err != nil {
		fmt.Println("Error inserting view")
		return err
	}
	return nil
}

func GetViewByVid(vid string) (*database.Views, error) {
	db, err := database.DBConn()
	if err != nil {
		fmt.Println("Error connecting to database")
		return nil, err
	}
	defer db.Close()
	rows, err := db.Query("SELECT * FROM views WHERE vid = $1", vid)
	if err != nil {
		fmt.Println("Error querying database")
		return nil, err
	}
	view := []*database.Views{}
	if err := database.ParseRows(rows, &view); err != nil {
		fmt.Println("Error parsing rows")
		return nil, err
	}
	return view[0], nil
}

func UpdateView(view database.Views) error {
	db, err := database.DBConn()
	if err != nil {
		fmt.Println("Error connecting to database")
		return err
	}
	defer db.Close()
	err = database.UpdateStruct(db, "views", view, "vid", view.Vid)
	if err != nil {
		fmt.Println("Error updating view")
		return err
	}
	return nil
}
