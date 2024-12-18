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
	rows, err := db.Query("SELECT rid, timestamp, age, gender, feature_a, feature_b, feature_c, feature_d, feature_e, feature_f FROM data WHERE rid = $1", rid)
	fmt.Println(rows)
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
	defer db.Close()

	// Start the base query with explicit column names
	query := "SELECT rid, timestamp, age, gender, feature_a, feature_b, feature_c, feature_d, feature_e, feature_f FROM data WHERE 1=1"
	var args []interface{}
	argIndex := 1 // For positional placeholders in PostgreSQL

	// Add age filter if enabled
	if age != -1 {
		query += fmt.Sprintf(" AND age = $%d", argIndex)
		args = append(args, age)
		argIndex++
	}

	// Add gender filter if enabled
	if gender != -1 {
		query += fmt.Sprintf(" AND gender = $%d", argIndex)
		args = append(args, gender)
		argIndex++
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
		query += fmt.Sprintf(" AND timestamp >= $%d AND timestamp <= $%d", argIndex, argIndex+1)
		args = append(args, start, end)
		argIndex += 2
	}
	// // Execute the dynamically built query
	// rows, err := db.Query(query, args...)
	// if err != nil {
	// 	return nil, err
	// }
	// defer rows.Close()

	// // Initialize the slice to hold the records
	// records := []*database.Data{}

	// // Parse the rows using ParseRows
	// if err := database.ParseRows(rows, &records); err != nil {
	// 	fmt.Println("Error parsing rows")
	// 	return nil, err
	// }

	// return records, nil
	rows, err := db.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Initialize the slice to hold the records
	records := []*database.Data{}

	// Loop through the rows and scan each one into a Data struct
	for rows.Next() {
		var record database.Data
		// Scan the row's columns into the Data struct fields
		err := rows.Scan(
			&record.Rid,
			&record.Date,
			&record.Age,
			&record.Gender,
			&record.FeatureA,
			&record.FeatureB,
			&record.FeatureC,
			&record.FeatureD,
			&record.FeatureE,
			&record.FeatureF,
		)
		if err != nil {
			fmt.Println("Error scanning row:", err)
			return nil, err
		}

		// Append the scanned record to the records slice
		records = append(records, &record)
	}

	// Check for errors encountered during iteration
	if err := rows.Err(); err != nil {
		fmt.Println("Error during row iteration:", err)
		return nil, err
	}

	return records, nil
}
