package data

import (
	"fmt"
	"roc8/database"
	"roc8/utils"
	"time"
)

func CreateDataRecord(record database.Data) error {
	db, err := database.DBConn()
	if err != nil {
		fmt.Println("Error connecting to database")
		return err
	}
	defer db.Close()
	record.Rid = utils.GenerateID()
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

// FilterData filters records based on optional criteria for age, gender, and date range.
// age: 0 for 15-25, 1 for >25, -1 for any age.
// gender: 0 for female, 1 for male, -1 for any gender.
// dateStart and dateEnd specify the bounds of the date range. If empty, no date filtering is applied.
func FilterData(records []*database.Data, age int, gender int, dateStart, dateEnd string) ([]*database.Data, error) {
	var filteredRecords []*database.Data

	var start, end time.Time
	var dateFilterEnabled bool

	// Parse dates if they are provided
	if dateStart != "" && dateEnd != "" {
		var err error
		start, err = time.Parse("2006-01-02", dateStart)
		if err != nil {
			return nil, err
		}
		end, err = time.Parse("2006-01-02", dateEnd)
		if err != nil {
			return nil, err
		}
		dateFilterEnabled = true
	}

	for _, record := range records {
		// Check age, if age filtering is enabled (i.e., age != -1)
		if age != -1 && record.Age != age {
			continue
		}

		// Check gender, if gender filtering is enabled (i.e., gender != -1)
		if gender != -1 && record.Gender != gender {
			continue
		}

		// Check date range, if date filtering is enabled
		if dateFilterEnabled {
			recordDate, err := time.Parse("2006-01-02", record.Date)
			if err != nil {
				return nil, err
			}
			if recordDate.Before(start) || recordDate.After(end) {
				continue
			}
		}

		// If all filters match, add the record to the results
		filteredRecords = append(filteredRecords, record)
	}

	return filteredRecords, nil
}
