package data

import (
	"fmt"
	"roc8/database"
	"roc8/helpers/data"
	"roc8/utils"
	"time"

	"github.com/gofiber/fiber/v2"
)

type CreateRequest struct {
	Date     string `json:"timestamp"`
	Age      int    `json:"age"`    // 0 for 15-25 and 1 for >25, assuming age is in this range
	Gender   int    `json:"gender"` // 0 for female and 1 for male
	FeatureA int    `json:"feature_a"`
	FeatureB int    `json:"feature_b"`
	FeatureC int    `json:"feature_c"`
	FeatureD int    `json:"feature_d"`
	FeatureE int    `json:"feature_e"`
	FeatureF int    `json:"feature_f"`
}

func CreateDataRecord(c *fiber.Ctx) error {
	req := new(CreateRequest)
	if err := c.BodyParser(req); err != nil {
		fmt.Println("Error parsing request")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request",
		})
	}
	rid := utils.GenerateID()
	record := &database.Data{
		Rid:      rid,
		Age:      req.Age,
		Gender:   req.Gender,
		FeatureA: req.FeatureA,
		FeatureB: req.FeatureB,
		FeatureC: req.FeatureC,
		FeatureD: req.FeatureD,
		FeatureE: req.FeatureE,
		FeatureF: req.FeatureF,
	}
	date, err := utils.ParseDate(req.Date) // Parse the DD/MM/YYYY format
	if err != nil {
		return err // handle the error
	}
	// formattedDate := date.Format("2006-01-02") // Format to YYYY-MM-DD
	record.Date = date
	err = data.CreateDataRecord(record)
	if err != nil {
		fmt.Println("Error creating record")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error creating record",
		})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Record created successfully",
	})
}

func GetRecordByRid(c *fiber.Ctx) error {
	rid := c.Params("rid")
	record, err := data.GetDataRecordByRid(rid)
	if err != nil {
		fmt.Println("Error getting record")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error getting record",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"record": record,
	})
}

type Filters struct {
	Age       int    `json:"age"`
	Gender    int    `json:"gender"`
	DateStart string `json:"date_start"`
	DateEnd   string `json:"date_end"`
}

func GetDataByFilters(c *fiber.Ctx) error {
	filters := new(Filters)
	if err := c.BodyParser(filters); err != nil {
		fmt.Println("Error parsing request")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request",
		})
	}
	dateStart, dateEnd := "", ""
	if filters.DateStart != "" && filters.DateEnd != "" {
		// Parse the date strings
		parsedStart, err := time.Parse("02/01/2006", filters.DateStart) // Parse the DD/MM/YYYY format
		if err != nil {
			return err // handle the error
		}
		parsedEnd, err := time.Parse("02/01/2006", filters.DateEnd) // Parse the DD/MM/YYYY format
		if err != nil {
			return err // handle the error
		}
		// Format as YYYY-MM-DD for function input
		dateStart = parsedStart.Format("2006-01-02")
		dateEnd = parsedEnd.Format("2006-01-02")
	}

	records, err := data.FilterData(filters.Age, filters.Gender, dateStart, dateEnd)
	if err != nil {
		fmt.Println("Error getting records", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error getting records",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"records": records,
	})
}
