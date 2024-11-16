package data

import (
	"fmt"
	"roc8/database"
	"time"
)

func CreateDataRecord(record *database.Data) error {
	db, err := database.DBConn()
	if err != nil {
		fmt.Println("Error connecting to database")
		return err
	}
	defer db.Close()
	// record.Rid = utils.GenerateID()
	err = database.InsertStruct(db, "data", record)
	if err != nil {
		fmt.Println("Error inserting record")
		return err
	}
	return nil
}

func GetDataRecordByRid(rid string) (*database.Data, error) {
	db, err := database.DBConn()
	if err != nil {
		fmt.Println("Error connecting to database")
		return nil, err
	}
	defer db.Close()
	rows, err := db.Query("SELECT * FROM data WHERE rid = $1", rid)
	if err != nil {
		fmt.Println("Error querying database")
		return nil, err
	}
	record := []*database.Data{}
	if err := database.ParseRows(rows, &record); err != nil {
		fmt.Println("Error parsing rows")
		return nil, err
	}
	return record[0], nil
}

// FilterData retrieves records based on optional criteria for age, gender, and date range.
// age: 0 for 15-25, 1 for >25, -1 for any age.
// gender: 0 for female, 1 for male, -1 for any gender.
// dateStart and dateEnd specify the bounds of the date range. If empty, no date filtering is applied.
func FilterData(age int, gender int, dateStart, dateEnd string) ([]*database.Data, error) {
	db, err := database.DBConn()
	if err != nil {
		return nil, fmt.Errorf("error connecting to database: %v", err)
	}
	// Start the base query
	query := "SELECT * FROM data WHERE 1=1"
	var args []interface{}

	// Add age filter if enabled
	if age != -1 {
		switch age {
		case 0:
			query += " AND age BETWEEN 15 AND 25"
		case 1:
			query += " AND age > 25"
		}
	}

	// Add gender filter if enabled
	if gender != -1 {
		query += " AND gender = ?"
		args = append(args, gender)
	}

	// Add date range filter if enabled
	if dateStart != "" && dateEnd != "" {
		start, err := time.Parse("2006-01-02", dateStart)
		if err != nil {
			return nil, fmt.Errorf("invalid start date: %v", err)
		}
		end, err := time.Parse("2006-01-02", dateEnd)
		if err != nil {
			return nil, fmt.Errorf("invalid end date: %v", err)
		}
		query += " AND date >= ? AND date <= ?"
		args = append(args, start, end)
	}

	// Execute the dynamically built query
	rows, err := db.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Parse the rows into a slice of *database.Data
	var records []*database.Data
	for rows.Next() {
		var record database.Data
		if err := rows.Scan(&record); err != nil {
			return nil, err
		}
		records = append(records, &record)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return records, nil
}
